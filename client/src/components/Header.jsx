import { useState, useEffect } from "react";
import { MobileNavBar } from "./MobileNavBar";
import { NavBar } from "./NavBar";

export const Header = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 900);
    };

    // Se llama para que cuando cargue se ponga el valor inicial
    handleResize();

    // Listener para detectar el resize
    window.addEventListener("resize", handleResize);

    // Se quita por problemas de memoria
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <>{isDesktop ? <NavBar /> : <MobileNavBar />}</>;
};
