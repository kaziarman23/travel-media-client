import Loader from "../Components/CustomHooks/Loader";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { userEmail, isLoading } = useSelector((state) => state.userSlice);

  const location = useLocation();

  if (isLoading) {
    return <Loader></Loader>;
  }

  if (userEmail) {
    return children;
  }

  return <Navigate to="/login" state={location.pathname} />;
};

export default PrivateRoute;
