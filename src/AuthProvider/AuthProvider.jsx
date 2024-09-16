import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [popularSpots, setPopularSpots] = useState([]);

  const authInfo = { popularSpots, setPopularSpots };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
