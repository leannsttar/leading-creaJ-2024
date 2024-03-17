import { Link } from "react-router-dom";
import { BlackButton } from "../components/ui/BlackButton";

const firstThreeFeatures = [
  {
    text: "Herramientas especializadas para potenciar el trabajo en equipo.",
    img: "/oc-taking-note.svg",
  },
  {
    text: "Una plataforma única para gestionar proyectos de manera eficiente.",
    img: "/oc-tools.svg",
  },
  {
    text: "Diseño intuitivo y opciones personalizables en la interfaz.",
    img: "/oc-puzzle.svg",
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
    <div className="w-1/2 flex flex-col justify-between p-5 h-[14em] border-[1px] border-[#cfcfcf] rounded-[1em]">
      <p className="text-lg leading-[1.25rem]">{feature}</p>
      <div className="flex justify-between gap-[0.75rem] items-center">
        <p className="text-sm leading-[1.25]">Aprende más</p>
        <img src="/rightArrowBgBlack.svg" alt="" />
      </div>
    </div>
  );
};

const TitleSection = ({ title }) => {
  return (
    <p
      className={`text-[1.7em] text-center font-anonymous tracking-tighter leading-[1.2em]`}
    >
      {title}
    </p>
  );
};

const RatingCard = ({ comment, name }) => {
  return (
    <div className="flex flex-col mt-[1.5rem] mb-[2.3rem] gap-[0.5rem]">
      <img src="./5stars.svg" alt="" className="w-[9rem]" />
      <p className="leading-[1.3rem]">{comment}</p>
      <div className="flex items-center gap-[0.5rem]">
        <img src="./avatarRating.svg" alt="" className="w-[2.7rem]" />
        <p>{name}</p>
      </div>
    </div>
  );
};

export const HomePage = () => {
  return (
    <div className="mx-[1.25rem] mb-[4rem]">
      <div className="w-full px-[1.25rem] pb-[4rem] flex flex-col items-center h-[80vh] justify-between mb-[3rem]">
        <p className="max-w-fit px-[0.75rem] py-[0.25rem] bg-[#d5e0ff] rounded-full text-[1em] font-prompt font-[500]">
          Bienvenido a Leading
        </p>
        <div className="w-full mt-[0.5rem] flex flex-col items-center gap-[1.25rem]">
          <h1 className="text-[2.6em] text-center font-md font-prompt w-auto leading-[2.6rem]">
            Productividad Con Una Gestión De Equipo Sencilla
          </h1>
          <img src="./hiFiveHomeBlack.svg" alt="" className="w-[15.7em]" />
        </div>
        <div className="w-full mt-[2rem] flex flex-col items-center gap-[1rem] mb-[2.5rem]">
          <p className="font-md text-[1.2em] tracking-tight text-center">
            Transforma la colaboración de tu equipo con nuestra plataforma
            innovadora.
          </p>
          {/* <img src="./playIcon.svg" alt="" className="w-[2em]" /> */}
          <BlackButton text={"Empieza ya"} />
        </div>
      </div>
      <div className="w-full">
        <div className="bg-[#D5E0FF] rounded-[4em] p-6 text-center flex flex-col gap-6">
          <TitleSection
            title={"Herramientas Para Una Colaboración Eficaz En Equipo"}
          />
          <p className="text-[#5B5B5B] text-left w-full text-[.85em]">
            Libera el potencial de tu equipo con nuestras herramientas
            integrales de colaboración en un solo lugar.
          </p>
          <div className="flex justify-center gap-3 text-[.9em] text-center">
            <BlackButton
              text={"Ver características"}
              className={"py-[.2em] rounded-lg"}
            />
            <Link to={"/login"}>Regístrate gratis</Link>
          </div>
          <div className="flex flex-col items-center gap-[2rem]">
            {firstThreeFeatures.map((feature, index) => {
              return (
                <div
                  key={index}
                  className="w-2/3 bg-[#FFD997] flex flex-col gap-[0.75rem] items-center rounded-2xl p-[0.5rem]"
                >
                  <p>{feature.text}</p>
                  <img src={feature.img} alt="" className="w-[7em]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="text-center space-y-4 mt-[3.5rem]">
        <TitleSection
          title={
            "Seguimiento Eficaz Del Progreso Con Nuestro Sistema De Gestión De Tareas"
          }
        />
        <p className="text-[#5B5B5B] w-full text-[.85em]">
          Una interfaz intuitiva y funciones fáciles de usar permiten asignar
          tareas, responsabilidades y supervisar hitos del proyecto con
          facilidad.
        </p>
        <div>
          {secondThreeFeatures.map((feature, index) => {
            return (
              <div key={index} className="flex gap-2 items-center text-left">
                <img src={feature.img} alt="" className="w-[20px]" />
                <p>{feature.text}</p>
              </div>
            );
          })}
        </div>
        <img src="/pencilStairs.svg" alt="" />
      </div>
      <div className="mt-[3.5rem] space-y-4">
        <TitleSection
          title={
            "Gestiona Eficientemente Tu Equipo Con Nuestras Características Integrales."
          }
        />
        <div className="flex bg-[#DAF4B6] p-4 rounded-2xl font-prompt">
          <div className="space-y-3">
            <p className="text-[1.2rem] leading-7 ">
              Compartir Archivos Sin Problemas
            </p>
            <p className="text-[.8em]">
              Garantiza que todos tengan acceso a los documentos.
            </p>
            <div className="flex gap-[0.75rem] items-center">
              <p>Aprende más</p>
              <img src="/rightArrowBgBlack.svg" alt="" />
            </div>
          </div>

          <img src="/managerFiles.svg" alt="" className="w-[20rem]" />
        </div>
        <div className="flex gap-6 font-prompt overflow-x-scroll">
          <FeatureCard feature={"Calendario Integrado"} />
          <FeatureCard feature={"Comunicación eficiente"} />
        </div>
      </div>
      <div className="mt-[3.5rem]">
        <TitleSection title={"Lo Que Los Usuarios Dicen De Nosotros"} />
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
  );
};
