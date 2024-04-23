import { Link, useLocation } from "react-router-dom";

import configIcon from "../assets/configIcon.svg";
import threeDotsSmaller from "../assets/threeDotsSmaller.svg";
import plusIcon from "../assets/plusIcon.svg";
import usersProjectIcon from "../assets/usersProjectIcon.svg"
import editIcon from "../assets/editIcon.svg"

import { SideBar } from "./SideBar.jsx";



const MiniTabLink = ({ title, notification, href }) => {
  return (
    <Link to={href}>
      <p className={`pb-2 px-6 hover:text-black cursor-pointer border-b-[2px] border-white hover:border-black ${notification ? 'hover:border-[#625DF5] border-b-[3px]' : ''}`}>
        {title}
      </p>
    </Link>
  );
};

const AvatarMember = ({ img, className }) => {
  return (
    <img src={img} alt="" className={`w-8 h-8 rounded-full ${className}`} />
  )
}

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

const tabLinksProject = [
  { title: "Vista general", href: "/" },
  { title: "Tablero", href: "/dashboard/project/board" },
  { title: "Timeline", href: "/dashboard/project/timeline" },
  { title: "Reuniones", href: "/dashboard/project/meetings" },
  { title: "Archivos", href: "/dashboard/project/files" },
  { title: "Configuración", href: "/dashboard/project/config" },
];

const LayoutProject = ({ children }) => {
  return (
    <div className="w-full max-h-screen overflow-y-hidden">
      <div className="h-[10rem] px-10 w-full flex items-center justify-between">
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-1 justify-center w-full mt-[1rem]">
            <div className="flex gap-5">
              <p className="text-[1.8rem] font-semibold">SAO web project</p>
              <img src={editIcon} alt="" className="w-6 h-6 mt-3" />
            </div>
            <div className="flex items-center gap-3 mt-1">
              <img src={usersProjectIcon} alt="" />
              <p>Asignar al proyecto</p>
              <div className="flex">
                <AvatarMember img={'https://i.pinimg.com/564x/bb/47/80/bb4780347a759a484265b65cb91d481a.jpg'} />
                <AvatarMember img={'https://i.pinimg.com/564x/33/f1/45/33f14533966e1d68e90b8646e82bd291.jpg'} className={'relative right-2'} />
                <AvatarMember img={'https://i.pinimg.com/564x/e1/d0/4e/e1d04e0e45c1301b98e7028955a9dfb9.jpg'} className={'relative right-4'} />
                <div className="bg-[#D9D9D9] w-8 h-8 flex justify-center items-center rounded-full relative right-6 font-semibold"><p>4+</p></div>
              </div>
              <button className="px-4 py-2 bg-[#D6EAF5] text-[#0070D8] font-semibold rounded-3xl">
                Añadir miembro
              </button>
            </div>
          </div>
          <div className="flex gap-6 text-[#7C7C7C] ">
            {tabLinksProject.map((link, index)=>{
              return(
                <div key={index}>
                  <MiniTabLink title={link.title} href={link.href}/>
                </div>
              )
            })}
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

const LayoutNotifications = ({ children }) => {
  return (
    <div className="w-full max-h-screen overflow-y-hidden">
      <div className="h-[10rem] px-10 w-full flex items-center justify-between">
        <div className="flex flex-col h-full justify-between">
          <div className="flex items-center w-full mt-[3rem]">
            <div>
              <p className="text-[2rem] font-semibold">Notificaciones</p>
            </div>
          </div>
          <div className="flex gap-6 text-[#7C7C7C] ">
            <MiniTabLink title={"Vista General"} notification />
            <MiniTabLink title={"Invitaciones"} notification />
            <MiniTabLink title={"Comentarios"} notification />
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
      {pathname == "/dashboard/project" ? (
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
