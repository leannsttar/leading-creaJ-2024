import { useState, useEffect } from "react";

const Feature = ({ title, description, children, className }) => {
  return (
    <div className={`bg-[#F5F5F7] rounded-2xl ${className}`}>
      <div className="p-4 space-y-3 md:p-[2rem] xl:px-[4rem] xl:pt-[4rem] xl:pb-[2rem]">
        <p className="font-semibold text-[1.1rem] leading-4 md:text-[1.7rem] md:font-medium md:leading-8">
          {title}
        </p>
        <p className="text-sm text-[1rem] leading-4 md:text-[1.1rem] md:leading-6">
          {description}
        </p>
        {children}
      </div>
    </div>
  );
};

const ButtonChangeFrame = ({ name, onClick, isActive }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bg-white p-1 rounded-lg border-[1px] border-[#CFCFCF] ${
        isActive ? "bg-[#E4E4E4]" : ""
      }`}
    >
      {name}
    </button>
  );
};

export const FeaturesPage = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [frame, setFrame] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
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

  useEffect(() => {
    setFrame(isDesktop ? "/frameTableroDesktop.jpg" : "/frameTablero.jpg");
  }, [isDesktop]);

  const changeFrame = (newFrame) => {
    setFrame(newFrame);
  };

  return (
    <div className="mb-[4rem] flex justify-center">
      <div className="w-[90%] md:w-[75%]">
        <div className="font-prompt pb-[5rem] space-y-[2.2rem] md:flex md:flex-col md:items-center">
          <h1 className="text-[2.2rem] text-center font-anonymous tracking-[.1rem] leading-[2.8rem] md:text-[4rem] md:w-[70%] lg:w-[50%] md:leading-[5rem] md:tracking-tighter mx-3 xl:my-[2rem]">
            Crear, Organizar, Colaborar
          </h1>
          <Feature
            title={"Crea tu proyectos con increíbles herramientas"}
            description={
              "Utiliza nuestras herramientas a tu favor para que puedas crear cosas increíbles"
            }
          >
            <div className="flex flex-col items-center gap-7">
              <img
                src={frame}
                alt="Panel Mostrado"
                className="border-[1px] border-[#d3d3d3] md:w-[90%] md:mt-5"
                onError={(event) => {
                  event.target.src = "/loadingError.svg";
                }}
              />
              <div className="flex flex-wrap gap-3 text-[.9rem] justify-center">
                <ButtonChangeFrame
                  name={"Tablero"}
                  isActive={
                    frame === "/frameTableroDesktop.jpg" ||
                    frame === "/frameTablero.jpg"
                  }
                  onClick={() =>
                    isDesktop
                      ? changeFrame("/frameTableroDesktop.jpg")
                      : changeFrame("/frameTablero.jpg")
                  }
                />
                <ButtonChangeFrame
                  name={"Timeline"}
                  isActive={
                    frame === "/frameTimelineDesktop.jpg" ||
                    frame === "/frameTimeline.jpg"
                  }
                  onClick={() =>
                    isDesktop
                      ? changeFrame("/frameTimelineDesktop.jpg")
                      : changeFrame("/frameTimeline.jpg")
                  }
                />
                <ButtonChangeFrame
                  name={"Reuniones"}
                  isActive={
                    frame === "/frameReunionesDesktop.jpg" ||
                    frame === "/frameReuniones.jpg"
                  }
                  onClick={() =>
                    isDesktop
                      ? changeFrame("/frameReunionesDesktop.jpg")
                      : changeFrame("/frameReuniones.jpg")
                  }
                />
                <ButtonChangeFrame
                  name={"Archivos"}
                  isActive={
                    frame === "/frameArchivosDesktop.jpg" ||
                    frame === "/frameArchivos.jpg"
                  }
                  onClick={() =>
                    isDesktop
                      ? changeFrame("/frameArchivosDesktop.jpg")
                      : changeFrame("/frameArchivos.jpg")
                  }
                />
              </div>
            </div>
          </Feature>
          <div className="space-y-[2.2rem] lg:space-y-0 lg:flex lg:justify-between">
            <Feature
              title={"Mantente al día con tus tareas"}
              description={
                "Tenemos un calendario para que no olvides de realizar tus pendientes y puedas organizarte de una mejor manera"
              }
              className={"lg:w-[48%]"}
            >
              <div className="flex justify-center">
                <img
                  src="/frameCalendario.png"
                  alt="Calendario personal"
                  className="w-full md:pb-[2rem] md:w-[90%] md:mt-5"
                />
              </div>
            </Feature>
            <Feature
              title={"Añade miembros y líderes"}
              description={
                "Puedes añadir miembros para que trabajen conjuntamente y puedan alcanzar sus objetivos"
              }
              className={"lg:w-[48%]"}
            >
              <div className="flex justify-center items-center ">
                <img
                  src="/frameAddMembers.svg"
                  alt="Calendario personal"
                  className="w-[70%] p-6 md:p-0 md:w-[85%] md:py-[2rem]"
                />
              </div>
            </Feature>
          </div>
          <div className="space-y-[2.2rem] xl:flex xl:items-center md:gap-[2rem] xl:gap-[6rem]">
            <div className="bg-[#F1EDFF] rounded-2xl">
              <p className="text-[1.5rem] text-center p-5 leading-[2rem]">
                Manten una comunicación eficiente con tu equipo en el chat
                grupal
              </p>
            </div>
            <div className="bg-[#F5F5F7] rounded-xl">
              <img
                src="/frameChat1.png"
                alt="Imagen 1 chat"
                className="w-full p-2 md:p-6"
              />
            </div>
          </div>
          <div className="space-y-[2.2rem] flex flex-col items-center xl:flex-row-reverse xl:items-center xl:gap-8">
            <div className="flex justify-center md:w-[70%] xl:p-[4rem]">
              <img
                src="/doodleChatting.svg"
                alt="Ilustration person chatting"
                className="w-full"
              />
            </div>
            <div className="bg-[#F5F5F7] rounded-xl">
              <img
                src="/frameChat2.png"
                alt="Imagen 2 chat"
                className="w-full p-2 md:p-6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
