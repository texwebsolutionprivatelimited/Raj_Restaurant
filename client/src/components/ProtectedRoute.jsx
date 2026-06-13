import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/src/lib/auth-store";

export default function ProtectedRoute({ children }) {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/menu" replace />;
  }

  return children;
}