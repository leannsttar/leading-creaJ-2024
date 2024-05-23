import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import publicRoutes from "./routes/publicRoutes.jsx";
import privateRoutes from "./routes/privateRoutes.jsx";
import { SessionProvider } from "./config/Session";

const allRoutes = [...publicRoutes, ...privateRoutes];

const router = createBrowserRouter(allRoutes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  </React.StrictMode>
);
