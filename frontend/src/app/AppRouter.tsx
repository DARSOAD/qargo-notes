import { useRoutes, BrowserRouter } from "react-router-dom";
import { AuthRoutes } from "./routes/AuthRoutes";
import { NotesRoutes } from "./routes/NotesRoutes";


export function AppRouter() {
  const routes = [
    ...AuthRoutes,
    ...NotesRoutes,
    { path: "*", element: <div>404 - Not found</div> },
  ];

  const element = useRoutes(routes);
  return <>{element}</>;
}

export function RootRouter() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
