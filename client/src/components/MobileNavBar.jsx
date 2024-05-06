import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { title: "Inicio", href: "/" },
  { title: "Sobre nosotros", href: "/about" },
  { title: "Características", href: "/features" },
  { title: "FAQs", href: "/faqs" },
  { title: "Iniciar sesión", href: "/login" },
  { title: "Registrarse", href: "/signup" },
];

export const MobileNavBar = () => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay:0.5,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1
      },
    },
  };

  return (
    <header>
      <nav className="flex justify-between items-center py-4 px-4 h-[10vh] font-prompt">
        <img src="/logoTemporalBlack.svg" alt="" />
        <img
          onClick={toggleMenu}
          className="mr-1"
          src="/hamburguerMenuBlack.svg"
          alt=""
        />
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 w-full h-screen origin-top bg-black text-white py-4 px-4 z-40"
          >
            <div className="flex h-full flex-col">
              <div className="flex justify-between items-center">
                <img src="/logoTemporalWhite.svg" alt="" />
                <img onClick={toggleMenu} src="/Xicon.svg" alt="" className="mr-1"/>
              </div>
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col h-full justify-center items-center gap-4 p-10"
                onClick={toggleMenu}
              >
                {navLinks.map((link, index) => {
                  return (
                    <div key={index} className="overflow-hidden">
                      <MobileNavLink
                        title={link.title}
                        href={link.href}
                      />
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const mobileLinkVars = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0, 0.55, 0.45, 1],
    },
  },
};

const MobileNavLink = ({ title, href }) => {
  return (
    <motion.div
      variants={mobileLinkVars}
      className="text-3xl font-light uppercase text-white text-center font-prompt"
    >
      <Link to={href}>
      {title}
      </Link>
    </motion.div>
  );
};
