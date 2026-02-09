
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const isLoggedIn = useSelector(
    (state: any) => state.auth.isLoggedIn
  );

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
