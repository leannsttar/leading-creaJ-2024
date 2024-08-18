import { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RxCode } from "react-icons/rx";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { clienteAxios } from "@/config/clienteAxios";
import { Loader } from "../../../components/Loader.jsx";
import { useParams } from "react-router-dom";

import addFileIcon from "../../../assets/addFileIcon.svg";
import commentIcon from "../../../assets/commentIcon.svg";
import finishIcon from "../../../assets/finishIcon.svg";
import deleteIcon from "../../../assets/deleteIcon.svg";
import calendarIcon from "../../../assets/calendarIcon.svg";

import {
  MdAssignment,
  MdEdit,
  MdPersonAdd,
  MdLabel,
  MdCheckBoxOutlineBlank,
  MdSwapHoriz,
  MdLink,
  MdCheckCircle,
  MdMail,
} from "react-icons/md";

const ActionRecord = ({ type, user, userImage, action, date }) => {
  let IconComponent;

  switch (type) {
    case "task_assignment":
      IconComponent = MdAssignment;
      break;
    case "task_edit":
      IconComponent = MdEdit;
      break;
    case "new_member_assignment":
      IconComponent = MdPersonAdd;
      break;
    case "new_tags":
      IconComponent = MdLabel;
      break;
    case "subtask_status_update":
      IconComponent = MdCheckBoxOutlineBlank;
      break;
    case "task_status_change":
      IconComponent = MdSwapHoriz;
      break;
    case "new_link":
      IconComponent = MdLink;
      break;
    case "invitation_accepted":
      IconComponent = MdCheckCircle;
      break;
    case "project_invitation":
      IconComponent = MdMail;
      break;
    default:
      IconComponent = RxCode;
  }

  return (
    <div className="bg-[#F7F7F7] rounded-xl px-3 py-2 lg:px-5 flex justify-between ">
      <div className="flex gap-1.5 lg:gap-4 items-center">
        <IconComponent className="text-2xl" />
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
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const handleUsuariosClick = () => {
    setRotateUsuarios(!rotateUsuarios);
  };

  const handleAccionesClick = () => {
    setRotateAcciones(!rotateAcciones);
  };

  const getTimeline = async () => {
    try {
      const response = await clienteAxios.get(
        `/api/notifications/getProjectNotifications/${params.id}`
      );
      const sortedTimeline = response.data.sort(
        (a, b) => new Date(b.event_time) - new Date(a.event_time)
      );
      setTimeline(sortedTimeline);
    } catch (error) {
      console.log("Error al obtener la línea de tiempo", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTimeline();
  }, []);

  if (loading) return <Loader />;

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
        {timeline.length > 0 ? (
          timeline.map((item, index) => (
            <ActionRecord
              key={index}
              type={item.type}
              user={item.actionUser.name}
              userImage={item.actionUser.image}
              action={item.content}
              date={formatDistanceToNow(new Date(item.event_time), {
                addSuffix: true,
                locale: es,
              })}
            />
          ))
        ) : (
          <p>No hay actividades recientes</p>
        )}
      </div>
    </div>
  );
};
