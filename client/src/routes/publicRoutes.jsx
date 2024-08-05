import React from "react";
import { HomePage } from "../pages/HomePage.jsx";
import { AboutUsPage } from "../pages/AboutUsPage.jsx";
import { FeaturesPage } from "../pages/FeaturesPage.jsx";
import { FAQsPage } from "../pages/FAQsPage.jsx";
import { LoginPage } from "../pages/LoginPage.jsx";
import { SignUpPage } from "../pages/SignUpPage.jsx";
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import { NotFoundPage } from "../pages/NotFoundPage.jsx";
import { VerifyAccount } from "@/pages/VerifyAccount.jsx";
import { AcceptInvitation } from "@/pages/AcceptInvitation.jsx";

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
  {
    path: "/verifyAccount",
    element: <VerifyAccount />,
  },
  {
    path: "/acceptInvitation/:id",
    element: <AcceptInvitation />,
  },
];

export default publicRoutes;
