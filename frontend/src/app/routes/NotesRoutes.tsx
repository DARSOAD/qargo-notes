import type { RouteObject } from "react-router-dom";
import NotesPage from "../../pages/app/NotesPage";
import { ProtectedRoute } from "./ProtectedRoute";

export const NotesRoutes: RouteObject[] = [
  {
    path: "/app/notes",
    element: (
      <ProtectedRoute>
        <NotesPage />
      </ProtectedRoute>
    ),
  }
];
