import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Loader from "../CustomHooks/Loader";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loader></Loader>;
  }

  if (user) {
    return children;
  }

  return (
    <Navigate
      to="/login"
      state={{
        from: location.pathname,
        message: "Please login to complete your booking!",
      }}
    />
  );
};

export default PrivateRoute;
