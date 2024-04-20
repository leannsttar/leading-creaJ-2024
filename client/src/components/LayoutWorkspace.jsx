import { useLocation } from "react-router-dom";

import configIcon from "../assets/configIcon.svg";
import threeDotsSmaller from "../assets/threeDotsSmaller.svg";
import plusIcon from "../assets/plusIcon.svg";

import { SideBar } from "./SideBar.jsx";

const MiniTabLink = ({ title }) => {
  return (
    <p className="pb-2 px-6 hover:text-black cursor-pointer border-b-[2px] border-white hover:border-black">
      {title}
    </p>
  );
};

const LayoutHome = ({ children }) => {
  return (
    <div className="w-full max-h-screen overflow-y-hidden">
      <div className="h-[10rem] px-10 w-full flex items-center">
        <div className="flex justify-between items-center w-full">
          <div>
            <p className="text-[2rem] font-semibold">Bienvenido Edward</p>
            <p className="text-[1.1rem]">
              Comienza a trabajar en equipo y organizar proyectos juntos!
            </p>
          </div>
          <div className="flex gap-2">
            <div className="border-[1px] rounded-md h-[2.7rem] w-[2.7rem] grid place-items-center cursor-pointer">
              <img src={configIcon} alt="" />
            </div>
            <div className="border-[1px] rounded-md h-[2.7rem] w-[2.7rem] grid place-items-center cursor-pointer">
              <img src={threeDotsSmaller} alt="" />
            </div>
            <div className="bg-black rounded-md text-white flex gap-3 items-center py-2 px-3 cursor-pointer">
              <img src={plusIcon} alt="" className="w-4" />
              <p>Nuevo proyecto</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="h-full">{children}</div>
    </div>
  );
};

const LayoutTasks = ({ children }) => {
  return (
    <div className="w-full max-h-screen overflow-y-hidden">
      <div className="h-[10rem] px-10 w-full flex items-center justify-between">
        <div className="flex flex-col h-full justify-between">
          <div className="flex items-center w-full mt-[3rem]">
            <div>
              <p className="text-[2rem] font-semibold">Mis Tareas</p>
            </div>
          </div>
          <div className="flex gap-6 text-[#7C7C7C] ">
            <MiniTabLink title={"Tablero"} />
            <MiniTabLink title={"Lista"} />
            <MiniTabLink title={"Calendario"} />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="border-[1px] rounded-md h-[2.7rem] w-[2.7rem] grid place-items-center cursor-pointer">
            <img src={configIcon} alt="" />
          </div>
          <div className="border-[1px] rounded-md h-[2.7rem] w-[2.7rem] grid place-items-center cursor-pointer">
            <img src={threeDotsSmaller} alt="" />
          </div>
          <div className="bg-black rounded-md text-white flex gap-3 items-center py-2 px-3 cursor-pointer">
            <img src={plusIcon} alt="" className="w-4" />
            <p>Nueva tarea</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="h-full">{children}</div>
    </div>
  );
};

const LayoutProject = ({ children }) => {
  return <>project</>;
};

const LayoutNotifications = ({ children }) => {
  return <>notis</>;
};

export const LayoutWorkspace = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="flex">
      <SideBar />
      {pathname == "/dashboard" ? <LayoutHome children={children} /> : ""}
      {pathname == "/dashboard/tasks" ? (
        <LayoutTasks children={children} />
      ) : (
        ""
      )}
      {pathname == "/dashboard/projects" ? (
        <LayoutProject children={children} />
      ) : (
        ""
      )}
      {pathname == "/dashboard/notifications" ? (
        <LayoutNotifications children={children} />
      ) : (
        ""
      )}
    </div>
  );
};
