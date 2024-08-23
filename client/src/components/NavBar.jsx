import { useState } from "react";
import { Link } from "react-router-dom";
import { SessionButton } from "./ui/SessionButton";

const navLinks = [
  { title: "Inicio", href: "/" },
  { title: "Sobre nosotros", href: "/about" },
  { title: "Características", href: "/features" },
  { title: "Preguntas frecuentes", href: "/faqs" },
  //   { title: "Iniciar Sesión", href: "/login" },
];

export const NavBar = () => {
  return (
    <header className="flex gap-6 p-5 items-center font-prompt z-20">
      <img src="../../public/logoTerminado.png" alt="" className="w-14"/>
      <nav className="flex justify-between w-full">
        <div className="flex gap-5 items-center">
          {navLinks.map((link, index) => {
            return (
              <div key={index} className="overflow-hidden">
                <NavLink title={link.title} href={link.href} />
              </div>
            );
          })}
        </div>
        <div className="flex gap-3">
          <Link to={'/login'}>
            <SessionButton text={"Inicia sesión"} color={"white"} />
          </Link>
          <Link to={'/signup'}>
            <SessionButton text={"Regístrate"} color={"black"} />
          </Link>
        </div>
      </nav>
    </header>
  );
};

const NavLink = ({ title, href }) => {
  return (
    <Link to={href}>
      <p className="px-4 py-1 hover:bg-[#F5F5F7] rounded-xl">{title}</p>
    </Link>
  );
};
