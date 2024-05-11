import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RxCode } from "react-icons/rx";

import addFileIcon from "../../../assets/addFileIcon.svg";
import commentIcon from "../../../assets/commentIcon.svg";
import finishIcon from "../../../assets/finishIcon.svg";
import deleteIcon from "../../../assets/deleteIcon.svg";
import calendarIcon from "../../../assets/calendarIcon.svg";

const ActionRecord = ({ type, user, userImage, action, date }) => {
  let iconSrc = "";

  switch (type) {
    case "addFile":
      iconSrc = addFileIcon;
      break;
    case "comment":
      iconSrc = commentIcon;
      break;
    case "finish":
      iconSrc = finishIcon;
      break;
    case "delete":
      iconSrc = deleteIcon;
      break;
    default:
      iconSrc = <RxCode />;
  }

  return (
    <div className="bg-[#F7F7F7] rounded-xl px-3 py-2 flex justify-between ">
      <div className="flex gap-1.5 items-center">
        <img src={iconSrc} alt="" className={`min-w-[1.2rem] min-h-[1.2rem]`} />
        <img
          src={userImage}
          alt=""
          className="rounded-full min-h-[3rem] min-w-[3rem] max-h-[3rem] max-w-[3rem]"
        />
        <div>
          <p className="text-[#7E7E7E] leading-5">
            <span className="font-semibold text-black">{user}</span> {action}
          </p>
        </div>
      </div>
      <div className="flex items-center mr-2 gap-3">
        <img src={calendarIcon} alt="" className="w-5 h-5 hidden lg:block" />
        <p className="text-[.8rem] lg:text-[1rem] whitespace-nowrap">{date}</p>
      </div>
    </div>
  );
};

export const TimelineTab = () => {
  const [rotateUsuarios, setRotateUsuarios] = useState(false);
  const [rotateAcciones, setRotateAcciones] = useState(false);

  const handleUsuariosClick = () => {
    setRotateUsuarios(!rotateUsuarios);
  };

  const handleAccionesClick = () => {
    setRotateAcciones(!rotateAcciones);
  };

  return (
    <div className="m-5 lg:mx-[7%] lg:mt-12 space-y-4">
      <div className="flex justify-between">
        <p className="font-bold text-[1.2rem]">Filtrar</p>
        <div className="flex gap-3">
          <div
            className="flex items-center lg:hidden"
            onClick={handleUsuariosClick}
          >
            <p>Usuarios</p>
            <MdKeyboardArrowDown
              className={`transform ${rotateUsuarios ? "-rotate-90" : ""}`}
            />
          </div>
          <div
            className="flex items-center lg:hidden"
            onClick={handleAccionesClick}
          >
            <p>Acciones</p>
            <MdKeyboardArrowDown
              className={`transform ${rotateAcciones ? "-rotate-90" : ""}`}
            />
          </div>
          <div className=" items-center hidden lg:flex lg:gap-3">
            <p>Filtrar por usuario</p>
            <div className="flex items-center" onClick={handleUsuariosClick}>
              <p className="font-semibold">Todos</p>
              <MdKeyboardArrowDown
                className={`transform ${rotateUsuarios ? "-rotate-90" : ""}`}
              />
            </div>
          </div>
          <div className="items-center hidden lg:flex lg:gap-3">
            <p>Filtrar por acción</p>
            <div className="flex items-center" onClick={handleAccionesClick}>
              <p className="font-semibold">Todos</p>
              <MdKeyboardArrowDown
                className={`transform ${rotateAcciones ? "-rotate-90" : ""}`}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <ActionRecord
          type={"addFile"}
          user={"Juan Charlie"}
          userImage={
            "https://i.pinimg.com/564x/5a/13/34/5a1334256dea673480a0c933d2368aa2.jpg"
          }
          action={
            "added 2 .pdf files to the task Payment method via e-commerce"
          }
          date={"27 feb"}
        />
        <ActionRecord
          type={"comment"}
          user={"Juan Charlie"}
          userImage={
            "https://i.pinimg.com/564x/5a/13/34/5a1334256dea673480a0c933d2368aa2.jpg"
          }
          action={"commented the task Create home ux writing content"}
          date={"27 feb"}
        />
        <ActionRecord
          type={"finish"}
          user={"Juan Charlie"}
          userImage={
            "https://i.pinimg.com/564x/5a/13/34/5a1334256dea673480a0c933d2368aa2.jpg"
          }
          action={"finished the task Create userflow website"}
          date={"27 feb"}
        />
        <ActionRecord
          type={"delete"}
          user={"Juan Charlie"}
          userImage={
            "https://i.pinimg.com/564x/5a/13/34/5a1334256dea673480a0c933d2368aa2.jpg"
          }
          action={"deleted 2 tasks Payment method and via e-commerce"}
          date={"27 feb"}
        />
        <ActionRecord
          type={"comment"}
          user={"Juan Charlie"}
          userImage={
            "https://i.pinimg.com/564x/5a/13/34/5a1334256dea673480a0c933d2368aa2.jpg"
          }
          action={"commented the task Create home ux writing content"}
          date={"27 feb"}
        />
        
      </div>
    </div>
  );
};
