import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [popularSpots, setPopularSpots] = useState([]);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  // Providers
  const GoogleProvider = new GoogleAuthProvider();

  // authentication with google
  const createUserWithGoogle = async (name) => {
    try {
      setLoading(true);
      // Sign in with Google
      await signInWithPopup(auth, GoogleProvider);

      // Updating the user's displayName
      await updateProfile(auth.currentUser, { displayName: name });
      // Set the updated user state with the displayName
      setUser({ ...auth.currentUser, displayName: name });
    } catch (error) {
      console.error("Error during Google register:", error);
    } finally {
      setLoading(false);
    }
  };

   // Email Authintication
  // create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update user
  const updateUser = (name, photo, email) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    }).then(() => {
      if (email) {
        return updateEmail(auth.currentUser, email);
      }
    });
  };


  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("user state is :", currentUser);
      setLoading(false);

      return () => {
        return unSubscribe();
      };
    });
  }, []);

  const authInfo = {
    popularSpots,
    setPopularSpots,
    user,
    createUser,
    updateUser,
    loginUser,
    logoutUser,
    loading,
    createUserWithGoogle,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
