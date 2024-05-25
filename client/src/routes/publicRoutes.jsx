import React from "react";
import { HomePage } from "../pages/HomePage.jsx";
import { AboutUsPage } from "../pages/AboutUsPage.jsx";
import { FeaturesPage } from "../pages/FeaturesPage.jsx";
import { FAQsPage } from "../pages/FAQsPage.jsx";
import { LoginPage } from "../pages/LoginPage.jsx";
import { SignUpPage } from "../pages/SignUpPage.jsx";
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import { NotFoundPage } from "../pages/NotFoundPage.jsx"

const publicRoutes = [
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
        <Footer />
      </>
    ),
  },
  {
    path: "/faqs",
    element: (
      <>
        <Header />
        <FAQsPage />
        <Footer />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        {/* <Header /> */}
        <LoginPage />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        {/* <Header /> */}
        <SignUpPage />
      </>
    ),
  },
];

export default publicRoutes;
