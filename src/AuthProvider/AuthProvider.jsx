import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [popularSpots, setPopularSpots] = useState([]);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  const createUser = async (email, password, name) => {
    try {
      setLoading(true);
      // Creating a user with email and password
      await createUserWithEmailAndPassword(auth, email, password);
      //  storing the user name in  displayName prop
      await updateProfile(auth.currentUser, { displayName: name });
      //  updated display name
      setUser({ ...auth.currentUser, displayName: name });
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setLoading(false);
    }
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
    loginUser,
    logoutUser,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
