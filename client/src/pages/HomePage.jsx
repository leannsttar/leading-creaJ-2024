import { Link } from "react-router-dom";
import { BlackButton } from "../components/ui/BlackButton";

const firstThreeFeatures = [
  {
    text: "Herramientas especializadas para potenciar el trabajo en equipo.",
    img: "/oc-taking-note.svg",
    className: "bg-[#FFD997]",
  },
  {
    text: "Una plataforma única para gestionar proyectos de manera eficiente.",
    img: "/oc-tools.svg",
    className: "",
  },
  {
    text: "Diseño intuitivo y opciones personalizables en la interfaz.",
    img: "/oc-puzzle.svg",
    className: "",
  },
];

const secondThreeFeatures = [
  {
    text: "Optimiza la asignación y colaboración de tareas.",
    img: "/checkIcon.svg",
  },
  {
    text: "Supervisa hitos y plazos del proyecto.",
    img: "/checkIcon.svg",
  },
  {
    text: "Optimiza la asignación y colaboración de tareas.",
    img: "/checkIcon.svg",
  },
];

const FeatureCard = ({ feature }) => {
  return (
    <div className="w-1/2 flex flex-col justify-between p-5 h-[14em] border-[1px] border-[#cfcfcf] rounded-[1em] md:h-full">
      <p className="text-lg leading-[1.25rem] md:text-[1.3rem] md:leading-[1.4rem]">
        {feature}
      </p>
      <div className="flex justify-between gap-[0.75rem] items-center">
        <p className="text-sm leading-[1.25] md:text-[1.2rem]">Aprende más</p>
        <img src="/rightArrowBgBlack.svg" alt="" className="md:w-[2rem]" />
      </div>
    </div>
  );
};

const TitleSection = ({ title, className }) => {
  return (
    <p
      className={`text-[1.7em] text-center font-anonymous tracking-tighter leading-[1.2em] ${className}`}
    >
      {title}
    </p>
  );
};

const RatingCard = ({ comment, name }) => {
  return (
    <div className="flex flex-col mt-[1.5rem] mb-[2.3rem] gap-[0.5rem] md:w-[45%]">
      <img src="./5stars.svg" alt="" className="w-[9rem] md:w-[12rem]" />
      <p className="leading-[1.3rem] md:text-[1.2rem] md:leading-[1.5rem]">{comment}</p>
      <div className="flex items-center gap-[0.5rem]">
        <img src="./avatarRating.svg" alt="" className="w-[2.7rem] md:w-[3.5rem]" />
        <p className="md:text-[1.1rem]">{name}</p>
      </div>
    </div>
  );
};

export const HomePage = () => {
  return (
    <div className="mx-[1.25rem] mb-[4rem] md:items-center md:justify-center flex flex-col gap-8 md:gap-20">
      <div className="flex md:mt-[1rem] md:h-[85vh] md:w-[93%]">
        <div className="w-full px-[1.25rem] flex flex-col items-center justify-between mb-[3rem] md:mb-0 md:items-start md:justify-center md:gap-[0rem] md:shrink md:px-0" style={{minHeight: '-webkit-fill-available'}}>
          <p className="max-w-fit px-[0.75rem] py-[0.25rem] bg-[#d5e0ff] rounded-full text-[1em] font-prompt font-[500]">
            Bienvenido a Leading
          </p>
          <div className="w-full mt-[0.5rem] flex flex-col items-center gap-[1.25rem]">
            <h1 className="text-[2em] text-center font-md font-prompt w-full leading-[2.6rem] md:text-start md:font-anonymous md:text-[5rem] md:leading-[5.8rem] md:tracking-tight">
              Productividad Con Una Gestión De Equipo Sencilla
            </h1>
            <img
              src="./hiFiveHo meBlack.svg"
              alt=""
              className="w-[15.7em] md:hidden"
            />
          </div>
          <div className="hidden md:flex items-center gap-3 font-prompt md:mt-[2rem]">
            <BlackButton text={"Empieza ya"} />
            <p>Ver características</p>
          </div>
          <div className="hidden md:flex font-prompt w-[70%] h-[33%] md:mt-10 z-10">
            <div className="bg-[#F6F6F5] w-[90%] p-5 flex flex-col justify-between rounded-xl z-10">
              <p className="text-[1.3rem]">
                Transforma la colaboración de tu equipo con nuestra plataforma
                innovadora.
              </p>
              <div className="flex gap-3 items-center">
                <img src="/playIcon.svg" alt="" className="w-[2.6rem]" />
                <p className="text-[1.3rem]">Ver vídeo</p>
              </div>
            </div>
            <div className="bg-[#282828] text-white flex flex-col justify-between pl-8 pr-6 py-6 rounded-br-xl rounded-tr-xl relative right-2 ">
              <div className="flex gap-3">
                <p className="text-[5rem] font-extralight leading-[5rem]">
                  4.8
                </p>
                <img
                  src="/yellowStar.svg"
                  alt=""
                  className="w-6 relative top-3"
                />
              </div>
              <div>
                <p className="text-[.8rem] border-t-[1px] pt-2 border-[#868686]">
                  Gestión y colaboración de equipos perfectas
                </p>
              </div>
            </div>
          </div>
          <div className="w-full mt-[2rem] flex flex-col items-center gap-[1rem] md:hidden">
            <p className="font-md text-[1.2em] tracking-tight text-center">
              Transforma la colaboración de tu equipo con nuestra plataforma
              innovadora.
            </p>
            {/* <img src="./playIcon.svg" alt="" className="w-[2em]" /> */}
            <BlackButton text={"Empieza ya"} />
          </div>
        </div>
        <div className="hidden xl:flex w-[100%] items-center h-full justify-center">
          <img src="/ImageHomeDesktop.svg" className="w-auto" alt="" />
        </div>
      </div>
      <div className="md:w-[75%] md:flex md:justify-center">
        <div className="bg-[#D5E0FF] rounded-[4em] p-6 text-center flex flex-col gap-6 md:p-12 md:gap-[4rem]">
          <div className="md:flex md:flex-row md:justify-between space-y-3 md:space-y-0">
            <TitleSection
              title={"Herramientas Para Una Colaboración Eficaz En Equipo"}
              className={"md:text-[3rem] md:text-left md:w-[40%]"}
            />
            <div className="font-prompt md:w-[30%] md:flex md:flex-col md:gap-8 space-y-3 md:space-y-0">
              <p className="text-[#5B5B5B] text-center w-full text-[.85em] md:text-[1.1rem] md:text-left">
                Libera el potencial de tu equipo con nuestras herramientas
                integrales de colaboración en un solo lugar.
              </p>
              <div className="flex justify-center items-center gap-3 text-[.9em] text-center md:gap-6 md:justify-normal md:flex-wrap">
                <BlackButton
                  text={"Ver características"}
                  className={"py-[.2em] rounded-lg md:text-[1rem]"}
                />
                <Link to={"/login"} className="md:text-[1rem]">
                  Regístrate gratis
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-[2rem] md:flex-row">
            {firstThreeFeatures.map((feature, index) => {
              return (
                <div
                  key={index}
                  className={`w-2/3 ${feature.className} flex flex-col gap-[0.75rem] items-center rounded-2xl p-[0.5rem] md:text-[1.1rem] md:p-10`}
                >
                  <p>{feature.text}</p>
                  <img src={feature.img} alt="" className="w-[7em]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="text-center space-y-4 mt-[3.5rem] md:w-[75%] md:flex md:gap-7 md:justify-between">
        <div className="space-y-4 md:space-y-10 md:w-[40%] md:flex md:flex-col md:justify-center">
          <TitleSection
            title={
              "Seguimiento Eficaz Del Progreso Con Nuestro Sistema De Gestión De Tareas"
            }
            className={"md:text-[3rem] md:text-left"}
          />
          <p className="text-[#5B5B5B] w-full text-[.85em] md:hidden">
            Una interfaz intuitiva y funciones fáciles de usar permiten asignar
            tareas, responsabilidades y supervisar hitos del proyecto con
            facilidad.
          </p>
          <p className="hidden md:block text-[#5B5B5B] w-full text-[1.2rem] text-left">
            Optimiza el seguimiento del progreso con nuestro sistema de gestión
            de tareas. Una interfaz intuitiva y funciones fáciles de usar
            permiten asignar tareas, responsabilidades y supervisar hitos del
            proyecto con facilidad.
          </p>
          <div className="space-y-3 hidden xl:block ">
            {secondThreeFeatures.map((feature, index) => {
              return (
                <div
                  key={index}
                  className="flex gap-2 items-center text-left md:text-[1rem]"
                >
                  <img src={feature.img} alt="" className="w-[20px]" />
                  <p>{feature.text}</p>
                </div>
              );
            })}
          </div>
          <div className="space-y-3 md:hidden ">
            {secondThreeFeatures.map((feature, index) => {
              return (
                <div
                  key={index}
                  className="flex gap-2 items-center text-left md:text-[1.2rem]"
                >
                  <img src={feature.img} alt="" className="w-[20px]" />
                  <p>{feature.text}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="md:w-[45%] md:items-center flex justify-center md:flex-col md:justify-center md:gap-10">
          <div className="w-[80%]">
            <img src="/pencilStairs.svg" alt="" className="" />
          </div>
          <div className="space-y-3 md:space-y-7">
            {secondThreeFeatures.map((feature, index) => {
              return (
                <div
                  key={index}
                  className="hidden gap-2 items-center text-left md:text-[1.2rem] md:flex xl:hidden"
                >
                  <img src={feature.img} alt="" className="w-[20px]" />
                  <p>{feature.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-[3.5rem] space-y-4 md:space-y-8 md:w-[75%] ">
        <TitleSection
          title={
            "Gestiona Eficientemente Tu Equipo Con Nuestras Características Integrales."
          }
          className={"md:text-[3rem] md:text-left md:w-[75%]"}
        />
        <div className="space-y-4 md:flex md:space-y-0 md:space-x-6">
          <div className="flex bg-[#DAF4B6] p-4 rounded-2xl font-prompt justify-between">
            <div className="space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <p className="text-[1.2rem] leading-7 md:text-[1.4rem]">
                  Compartir Archivos Sin Problemas
                </p>
                <p className="text-[.8em] md:text-[1rem]">
                  Garantiza que todos tengan acceso a los documentos.
                </p>
              </div>
              <div className="flex gap-[0.75rem] items-center md:text-[1rem]">
                <p>Aprende más</p>
                <img
                  src="/rightArrowBgBlack.svg"
                  alt=""
                  className="md:w-[2rem]"
                />
              </div>
            </div>
            <img src="/managerFiles.svg" alt="" className="w-[16rem]" />
          </div>
          <div className="flex gap-6 font-prompt">
            <FeatureCard feature={"Calendario Integrado"} />
            <FeatureCard feature={"Comunicación eficiente"} />
          </div>
        </div>
      </div>
      <div className="mt-[3.5rem] md:w-[75%]">
        <TitleSection
          title={"Lo Que Los Usuarios Dicen De Nosotros"}
          className={"md:text-[3rem] md:text-left xl:w-[60%]"}
        />
        <div className="md:flex md:justify-between">
          <RatingCard
            name={"Jenny Wilson"}
            comment={
              "La experiencia con nuestra plataforma de gestión de trabajo en equipo ha sido increíble, mejorando eficiencia y colaboración."
            }
          />
          <RatingCard
            name={"Jenny Wilson"}
            comment={
              "La experiencia con nuestra plataforma de gestión de trabajo en equipo ha sido increíble, mejorando eficiencia y colaboración."
            }
          />
        </div>
      </div>
    </div>
  );
};
