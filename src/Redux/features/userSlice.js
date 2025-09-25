import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import auth from "../../Firebase/firebase.config";

const initialState = {
  userName: "",
  userEmail: "",
  isLoading: true,
  isError: false,
  error: "",
};

const googleProvider = new GoogleAuthProvider();

// creating user with email
export const createUser = createAsyncThunk(
  "userSlice/createUser",
  async ({ userName, userEmail, userPassword }) => {
    const data = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      userPassword
    );
    await updateProfile(auth.currentUser, {
      displayName: userName,
    });

    // console.log("user slice log: ",data);

    return {
      userName: data.user.displayName,
      userEmail: data.user.email,
    };
  }
);

// login user with email
export const loginUser = createAsyncThunk(
  "userSlice/loginUser",
  async ({ userEmail, userPassword }) => {
    const data = await signInWithEmailAndPassword(
      auth,
      userEmail,
      userPassword
    );

    return {
      userName: data.user.displayName,
      userEmail: data.user.email,
    };
  }
);

// creating user with google
export const googleSignIn = createAsyncThunk(
  "userSlice/googleSignIn",
  async () => {
    const data = await signInWithPopup(auth, googleProvider);

    return {
      userName: data.user.displayName,
      userEmail: data.user.email,
    };
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.userName = payload.userName;
      state.userEmail = payload.userEmail;
    },
    toggleLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    logoutUser: (state) => {
      state.userName = "";
      state.userEmail = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.userName = "";
        state.userEmail = "";
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.userName = payload.userName;
        state.userEmail = payload.userEmail;
        state.isLoading = false;
        state.isError = false;
        state.error = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.userName = "";
        state.userEmail = "";
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      }) // google singIn
      .addCase(googleSignIn.pending, (state) => {
        state.userName = "";
        state.userEmail = "";
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(googleSignIn.fulfilled, (state, { payload }) => {
        state.userName = payload.userName;
        state.userEmail = payload.userEmail;
        state.isLoading = false;
        state.isError = false;
        state.error = false;
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.userName = "";
        state.userEmail = "";
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const { setUser, toggleLoading, logoutUser } = userSlice.actions;

export default userSlice.reducer;
