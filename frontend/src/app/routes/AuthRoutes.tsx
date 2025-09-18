import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { LoginPage} from "../../pages/auth/LoginPage";
import { SignupPage} from "../../pages/auth/SignupPage";


export const AuthRoutes: RouteObject[] = [
{ path: "/", element: <Navigate to="/login" replace /> },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
];
