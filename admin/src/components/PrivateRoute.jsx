import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../features/auth/authSlice";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, tokenExpiry } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const isTokenExpired = () => {
    if (!tokenExpiry) return true;
    const expiryTime = new Date(tokenExpiry).getTime();
    const currentTime = new Date().getTime();
    return currentTime > expiryTime;
  };

  if (!isAuthenticated || isTokenExpired()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
