import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import publicRoutes from "./routes/publicRoutes.jsx";
import privateRoutes from "./routes/privateRoutes.jsx";

const allRoutes = [...publicRoutes, ...privateRoutes];

const router = createBrowserRouter(allRoutes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
