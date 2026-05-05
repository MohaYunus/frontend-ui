import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isLoggedIn = localStorage.getItem("loggedInUser");

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}