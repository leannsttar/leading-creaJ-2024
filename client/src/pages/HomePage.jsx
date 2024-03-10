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
    <div className="flex flex-col text-lg justify-between p-5 h-[10em] border-2 border-[#C0C0C0]">
      <p>{feature}</p>
      <div className="flex justify-between items-center">
        <p>Aprende más</p>
        <img src="/rightArrowBgBlack.svg" alt="" />
      </div>
    </div>
  );
};

export const HomePage = () => {
  return (
    <div className="mx-4">
      <div className="w-full p-2 flex flex-col items-center h-[90vh] justify-between">
        <p className="max-w-fit px-3 py-1 bg-[#d5e0ff] rounded-full text-[1em] font-prompt font-[500]">
          Bienvenido a TeamSync
        </p>
        <div className="w-full mt-2 flex flex-col items-center gap-5">
          <h1 className="text-[2.6em] text-center font-md font-prompt w-auto leading-[2.6rem]">
            Productividad Con Una Gestión De Equipo Sencilla
          </h1>
          <img src="./hiFiveHomeBlack.svg" alt="" className="w-[15.7em]" />
        </div>
        <div className="w-full mt-8 flex flex-col items-center gap-4 mb-10">
          <p className="font-semibold text-[1.2em] tracking-tight text-center">
            Transforma la colaboración de tu equipo con nuestra plataforma
            innovadora.
          </p>
          <img src="./playIcon.svg" alt="" className="w-[2em]" />
          <BlackButton text={"Empieza ya"} />
        </div>
      </div>
      <div>
        <div className="bg-[#D5E0FF] rounded-[4em] p-6 text-center flex flex-col gap-6">
          <p className="text-[1.7em] font-anonymous tracking-tighter leading-[1.2em]">
            Herramientas Para Una Colaboración Eficaz En Equipo
          </p>
          <p className="text-[#5B5B5B] text-left w-full text-[.85em]">
            Libera el potencial de tu equipo con nuestras herramientas
            integrales de colaboración en un solo lugar.
          </p>
          <div className="flex items-center gap-3 text-[.9em]">
            <BlackButton
              text={"Ver características"}
              className={"py-[.2em] rounded-lg"}
            />
            <Link to={"/login"}>Regístrate gratis</Link>
          </div>
          {firstThreeFeatures.map((feature, index) => {
            return (
              <div
                key={index}
                className="bg-[#FFD997] flex flex-col gap-3 items-center rounded-2xl mx-10 p-2"
              >
                <p>{feature.text}</p>
                <img src={feature.img} alt="" className="w-[7em]" />
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-center space-y-4 mt-14">
        <p className="text-[1.7em]  font-anonymous tracking-tighter leading-[1.2em]">
          Seguimiento Eficaz Del Progreso Con Nuestro Sistema De Gestión De
          Tareas
        </p>
        <p className="text-[#5B5B5B] w-full text-[.85em]">
          Optimiza el seguimiento del progreso con nuestro sistema de gestión de
          tareas. Una interfaz intuitiva y funciones fáciles de usar permiten
          asignar tareas, responsabilidades y supervisar hitos del proyecto con
          facilidad.
        </p>
        <div>
          {secondThreeFeatures.map((feature, index) => {
            return (
              <div className="flex gap-2 items-center text-left">
                <img src={feature.img} alt="" className="w-[20px]" />
                <p key={index}>{feature.text}</p>
              </div>
            );
          })}
        </div>
        <img src="/pencilStairs.svg" alt="" />
      </div>
      <div className="mt-14 space-y-4">
        <p className="text-[1.7em] text-center font-anonymous tracking-tighter leading-[1.2em]">
          Gestiona Eficientemente Tu Equipo Con Nuestras Características
          Integrales.
        </p>
        <div className="flex bg-[#DAF4B6] p-4 rounded-2xl font-prompt">
          <div className="space-y-3">
            <p className="text-[1.4em] leading-7 ">Compartir Archivos Sin Problemas</p>
            <p className="text-[.8em]">
              Comparte archivos fácilmente con tu equipo, garantizando que todos
              tengan acceso a los documentos.
            </p>
            <div className="flex justify-between items-center">
              <p>Aprende más</p>
              <img src="/rightArrowBgBlack.svg" alt=""/>
            </div>
          </div>

          <img src="/managerFiles.svg" alt="" className="w-[10em]"/>
        </div>
        <div className="flex gap-6 font-prompt">
          <FeatureCard feature={"Calendario Integrado"} />
          <FeatureCard feature={"Comunicación eficiente"} />
        </div>
      </div>
    </div>
  );
};
