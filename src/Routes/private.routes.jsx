import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/AuthContext";
import { useContext } from "react";

const PrivateRoute = () => {
  const { isAuthenticated } = useContext(useAuth);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;