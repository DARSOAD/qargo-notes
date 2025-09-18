import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../features/auth/store/authStore";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: Props) {
  const { accessToken, userId } = useAuthStore();

  if (!accessToken || !userId) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>; 
}