import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { RootRouter } from "../src/app/AppRouter";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
// import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="light">
      <RootRouter />
    </MantineProvider>
  </React.StrictMode>
);