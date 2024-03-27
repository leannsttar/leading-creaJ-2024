import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";

import "./index.css";

import { HomePage } from "./pages/HomePage.jsx";
import { AboutUsPage } from "./pages/AboutUsPage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";
import { FeaturesPage } from "./pages/FeaturesPage.jsx";
import { FAQsPage } from "./pages/FAQsPage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { Footer } from "./components/Footer.jsx"
import { Header } from "./components/Header.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <HomePage />
        <Footer />
      </>
    ),
    errorElement: <NotFoundPage />,
  },
  {
    path: "/about",
    element: (
      <>
        <Header />
        <AboutUsPage />
        <Footer />
      </>
    ),
  },
  {
    path: "/features",
    element: (
      <>
        <Header />
        <FeaturesPage />
      </>
    ),
  },
  {
    path: "/faqs",
    element: (
      <>
        <Header />
        <FAQsPage />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Header />
        <LoginPage />
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
