import { useState } from "react";
import { Link } from "react-router-dom";

import dashboardIcon from "../assets/dashboardIcon.svg";
import tasksIcon from "../assets/tasksIcon.svg";
import messagesIcon from "../assets/messagesIcon.svg";
import notificationIcon from "../assets/notificationIcon.svg"
import addProjectIcon from "../assets/addProjectIcon.svg";
import sunLightMode from "../assets/sunLightMode.svg";
import moonDarkMode from "../assets/moonDarkMode.svg";
import threeDotsIcon from "../assets/threeDotsIcon.svg";
import threeLinesMenu from "../assets/3linesMenu.svg";

const navLinks = [
  { title: "Dashboard", href: "/dashboard", img: dashboardIcon },
  { title: "Tareas", href: "/dashboard/tasks", img: tasksIcon },
  { title: "Mensajes", href: "/dashboard/messages", img: messagesIcon },
  { title: "Notificaciones", href: "/dashboard/notifications", img: notificationIcon },
];

const SideBarLink = ({ name, img, href, isProject, isShrinked }) => {
  return isProject ? (
    <Link to={href}>
      <div
        className={`flex items-center gap-4 py-[0.40rem] px-2 hover:bg-[#f1eefd] rounded-lg cursor-pointer relative`}
      >
        <img
          src={img}
          alt="Project image"
          className="rounded-full min-w-[2rem] min-h-[2rem] max-w-[2rem] max-h-[2rem] object-cover"
        />
        <p
          className={`text-[1rem] ${
            isShrinked ? "opacity-0 pointer-events-none	" : ""
          }`}
          style={{ whiteSpace: "nowrap", transition: "all 250ms ease" }}
        >
          {name}
        </p>
      </div>
    </Link>
  ) : (
    <Link to={href}>
      <div
        className={`flex gap-4 py-[0.60rem] px-3 hover:bg-[#EBF1FD] rounded-lg cursor-pointer `}
      >
        <img src={img} alt={`${img}`} className="w-5"/>
        <p
          className={`text-[1rem] ${
            isShrinked ? "opacity-0 pointer-events-none	" : ""
          }`}
          style={{ transition: "all 350ms ease" }}
        >
          {name}
        </p>
      </div>
    </Link>
  );
};

export const SideBar = () => {
  const [isDark, setIsDark] = useState(false);

  const [isShrinked, setIsShrinked] = useState(false);

  const changeMode = () => {
    setIsDark(!isDark);
  };

  const changeView = () => {
    setIsShrinked(!isShrinked);
  };

  return (
    <aside
      className={`w-[20rem] h-screen font-inter flex flex-col justify-between border-r-[1px] ${
        isShrinked ? "w-[5rem]" : ""
      }`}
      style={{ transition: "width 500ms ease" }}
    >
      <div>
        <div
          className={`flex items-center gap-3 px-6 h-[5rem] relative justify-end ${
            isShrinked ? "!px-1 !mx-5" : ""
          }`}
        >
          <div
            className={`flex items-center gap-3 ${
              isShrinked ? "opacity-0 absolute left-0 -z-10" : ""
            }`}
            style={{ transition: "opacity 300ms ease" }}
          >
            <img src="/logoTemporalBlack.svg" alt="Logo" className="w-[2rem]" />
            <p className="font-[600] text-[1.3rem]">Leading</p>
          </div>
          <img
            src={threeLinesMenu}
            onClick={changeView}
            alt=""
            className={`ml-auto cursor-pointer ${isShrinked && "mr-1"}`}
          />
        </div>
        <hr className="w-[85%] m-auto" />
        <div className="p-4">
          <div>
            <div className="mt-1 space-y-[0.40rem] text-[#000000] pb-5 ">
              {navLinks.map((link, index) => {
                return (
                  <div key={index} className="overflow-hidden">
                    <SideBarLink
                      name={link.title}
                      img={link.img}
                      href={link.href}
                      isShrinked={isShrinked}
                    />
                  </div>
                );
              })}
            </div>
            <hr className="w-[87%] m-auto" />
            <div className="mt-7">
              <div className="flex justify-end px-4">
                <p
                  className={`text-[.75rem] font-semibold text-[#787486] mr-auto ${
                    isShrinked ? "opacity-0 absolute left-0" : ""
                  }`}
                  style={{
                    whiteSpace: "nowrap",
                    transition: "opacity 300ms ease",
                  }}
                >
                  MIS PROYECTOS
                </p>
                <img
                  src={addProjectIcon}
                  alt="Icono añadir proyecto"
                  className={`cursor-pointer ${isShrinked && "h-[18px]"}`}
                />
              </div>
              <div className="mt-3 space-y-1">
                <SideBarLink
                  name={"Sao web project"}
                  img={
                    "https://i.pinimg.com/564x/e0/fc/a8/e0fca85a942e80d6cbb40787d59a3de1.jpg"
                  }
                  isProject
                  isShrinked={isShrinked}
                  href={'/dashboard/project'}
                />
                <SideBarLink
                  name={"Website Redesign"}
                  img={
                    "https://i.pinimg.com/564x/b9/6d/51/b96d515e1839a055244a8dea35703dcc.jpg"
                  }
                  isProject
                  isShrinked={isShrinked}
                />
                <SideBarLink
                  name={"Design System"}
                  img={
                    "https://i.pinimg.com/564x/08/be/63/08be63fcc6d8f35377afb9c1ded05094.jpg"
                  }
                  isProject
                  isShrinked={isShrinked}
                />
                <SideBarLink
                  name={"Wireframes"}
                  img={
                    "https://i.pinimg.com/564x/e2/41/ad/e241ad2db149b457d44b45121b92bdab.jpg"
                  }
                  isProject
                  isShrinked={isShrinked}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-6">
        <button
          onClick={changeMode}
          className={`flex bg-[#F5F5F5] rounded-full p-1.5 w-fit relative   ${
            isShrinked ? "flex-col" : ""
          } `}
        >
          <div
            className={`bg-[#fff] rounded-full shadow-lg absolute ${
              isShrinked ? "" : isDark ? " translate-x-[95%]" : ""
            }`}
            style={{
              transition: "all 250ms ease",
              transform: isShrinked && isDark && "translateY(50px)",
            }}
          >
            <img
              src={sunLightMode}
              alt=""
              className={`invisible ${isShrinked ? "px-2 py-4" : "py-2 px-4"} `}
            />
          </div>
          <div className={`flex ${isShrinked ? "flex-col" : ""}`}>
            <img
              src={sunLightMode}
              alt=""
              className={`z-10 ${isShrinked ? "px-2 py-4" : "py-2 px-4"} `}
            />
            <img
              src={moonDarkMode}
              alt=""
              className={` z-10 ${isShrinked ? "px-2 py-4" : "p-2 px-4"} `}
            />
          </div>
        </button>
        <hr />
        <div className="flex gap-3 items-center mb-5">
          <img
            src="https://i.pinimg.com/564x/ab/33/a6/ab33a6e1ddfcff8e5b8d7daa262d1c1f.jpg"
            alt=""
            className="min-w-[3rem] min-h-[3rem] max-w-[3rem] max-h-[3rem] rounded-full object-cover"
          />
          <div
            className={`${isShrinked ? "opacity-0" : ""}`}
            style={{ whiteSpace: "nowrap", transition: "all 250ms ease" }}
          >
            <p className="font-semibold">Doyne</p>
            <p className="text-[.8rem] text-[#667085]">collins@brees.com</p>
          </div>
          <img
            src={threeDotsIcon}
            alt=""
            className={`cursor-pointer ${
              isShrinked ? "opacity-0 absolute" : ""
            }`}
            style={{
              transition: "opacity 150ms ease",
              transition: "position 300ms ease",
            }}
          />
        </div>
      </div>
    </aside>
  );
};



{
  /* <aside className={`w-[20rem] h-screen font-inter flex flex-col justify-between`}>
      <div>
        <div className="flex items-center gap-3 border-b-[1px] border-[#e9e8e8] px-6 py-6">
          <img src="/logoTemporalBlack.svg" alt="Logo" className="w-[2rem]" />
          <p className="font-[600] text-[1.3rem]">Leading</p>
          
        </div>
        <div className="p-4">
          <div>
            <div className="mt-1 space-y-[0.40rem] text-[#000000] pb-5 ">
              <SideBarLink name={"Dashboard"} img={dashboardIcon} />
              <SideBarLink name={"Tareas"} img={tasksIcon} />
              <SideBarLink name={"Mensajes"} img={messagesIcon} />
              <SideBarLink name={"Usuarios"} img={usersIcon} />
            </div>
            <hr className="w-[87%] m-auto" />
            <div className="mt-7">
              <div className="flex justify-between px-4">
                <p className="text-[.75rem] font-semibold text-[#787486]">
                  MIS PROYECTOS
                </p>
                <img
                  src={addProjectIcon}
                  alt="Icono añadir proyecto"
                  className="cursor-pointer"
                />
              </div>
              <div className="mt-3 space-y-1">
                <SideBarLink
                  name={"Sao web project"}
                  img={
                    "https://i.pinimg.com/564x/e0/fc/a8/e0fca85a942e80d6cbb40787d59a3de1.jpg"
                  }
                  isProject
                />
                <SideBarLink
                  name={"Website Redesign"}
                  img={
                    "https://i.pinimg.com/564x/b9/6d/51/b96d515e1839a055244a8dea35703dcc.jpg"
                  }
                  isProject
                />
                <SideBarLink
                  name={"Design System"}
                  img={
                    "https://i.pinimg.com/564x/08/be/63/08be63fcc6d8f35377afb9c1ded05094.jpg"
                  }
                  isProject
                />
                <SideBarLink
                  name={"Wireframes"}
                  img={
                    "https://i.pinimg.com/564x/e2/41/ad/e241ad2db149b457d44b45121b92bdab.jpg"
                  }
                  isProject
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-6">
        <button
          onClick={changeMode}
          className={`flex bg-[#F5F5F5] rounded-full p-2 w-fit relative  ${
            isDark ? "flex-row-reverse " : ""
          } `}
        >
          <div className="bg-[#fff] rounded-full shadow-lg absolute place-self-end">
            <img src={sunLightMode} alt="" className="py-2 px-4 invisible" />
          </div>
          <div className="flex">
            <img src={sunLightMode} alt="" className="py-2 px-4 z-10" />
            <img src={moonDarkMode} alt="" className="p-2 px-4 z-10" />
          </div>
        </button>
        <hr />
        <div className="flex gap-3 items-center mb-5">
          <img src="https://i.pinimg.com/564x/ab/33/a6/ab33a6e1ddfcff8e5b8d7daa262d1c1f.jpg" alt="" className="w-[3rem] h-[3rem] rounded-full object-cover"/>
          <div>
            <p className="font-semibold">Doyne</p>
            <p className="text-[.8rem] text-[#667085]">collins@brees.com</p>
          </div>
          <img src={threeDotsIcon} alt="" className="cursor-pointer"/>
        </div>
      </div>
    </aside> */
}
