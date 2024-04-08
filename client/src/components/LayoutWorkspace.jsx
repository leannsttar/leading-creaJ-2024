import configIcon from "../assets/configIcon.svg";
import threeDotsSmaller from "../assets/threeDotsSmaller.svg";
import plusIcon from "../assets/plusIcon.svg";

import { SideBar } from "./SideBar.jsx";

export const LayoutWorkspace = ({ children }) => {
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full max-h-screen overflow-y-hidden">
        <div className="p-10">
          <div className="flex">
            <div>
              <p>Bienvenido Tal persona</p>
              <p>Comienza a trabajar en equipo y organizar proyectos juntos!</p>
            </div>
            <div className="flex">
              <div className="p-3 border-[1px] rounded-md">
                <img src={configIcon} alt="" />
              </div>
              <div>
                <img src={threeDotsSmaller} alt="" />
              </div>
              <div>
                <img src={plusIcon} alt="" />
                <p>Nuevo proyecto</p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full">{children}</div>
      </div>
    </div>
  );
};
