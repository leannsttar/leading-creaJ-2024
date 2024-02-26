import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import { HomePage } from "./pages/HomePage.jsx";
import { AboutUs } from "./pages/AboutUsPage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";
import { FeaturesPage } from "./pages/FeaturesPage.jsx";
import { FAQsPage } from "./pages/FAQsPage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />
  },
  {
    path: "/about",
    element: <AboutUs />
  },
  {
    path: "/features",
    element: <FeaturesPage />
  },
  {
    path: "/faqs",
    element: <FAQsPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
