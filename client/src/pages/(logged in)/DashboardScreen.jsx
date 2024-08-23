import { useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

import { format } from "date-fns";

import MiniCalendar from "@/components/(logged in)/tasks/MiniCalendar";

import mailIcon from "../../assets/mailIcon.svg";
import threeDotsIcon from "../../assets/threeDotsSmaller.svg";
import threeDotsProfile from "../../assets/threeDotsProfile.svg";
import { TitleSection } from "../../components/ui/TitleSection";

import useProject from "@/hooks/useProject";

// Sesión
import { clienteAxios } from "@/config/clienteAxios";
import { useSession } from "@/config/useSession";

import { CreateProjectModal } from "@/components/modal/CreateProjectModal";


import {
  Modal,

  Form,
  Input,
  Upload,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import ImgCrop from "antd-img-crop";
import axios from "axios";

const MessageComponent = ({ img, name, message }) => {
  return (
    <div className="flex items-center gap-2 truncate">
      <img
        src={img}
        alt=""
        className="rounded-full min-w-12 min-h-12 max-w-12 max-h-12 object-cover"
      />
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-[#797979] ">{message}</p>
      </div>
    </div>
  );
};

const array = ["bg-[#FEE4CB]", "bg-[#FFD3E2]", "bg-[#E9E7FD]", "bg-[#C8F7DC]"];

const randomBackground = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const item = arr[randomIndex];

  return item;
};

const membersImages = [
  "https://i.pinimg.com/564x/92/65/92/926592d27ecc6abc27d73a7dde4f1130.jpg",
  "https://i.pinimg.com/564x/b0/4d/ce/b04dce32900438388f8828766ad91d9c.jpg",
  "https://i.pinimg.com/564x/65/61/5e/65615e8b17ba19d86b5b7220f7341911.jpg",
];

const ProjectCard = ({
  id,
  title,
  image,
  date,
  members, 
  category,
  progress,
}) => {
  const background = randomBackground(array);

  return (
    <Link
      to={`/dashboard/project/${id}`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "rgba(255, 255, 255, 0.45)",
        backgroundBlendMode: "overlay",
      }}
      className="bg-opacity-95 cursor-pointer px-6 py-4 rounded-3xl space-y-1 lg:w-full xl:w-[45%]"
    >
      <div>
        <div className="flex justify-between items-center">
          <p className="text-gray-500">{date}</p>
          <img src={threeDotsIcon} alt="" className="rotate-90" />
        </div>
        <div className="flex flex-col justify-center items-center w-full text-center pt-1 lg:gap-4">
          <div translate="no">
            <p className="text-2xl font-bold">{title}</p>
            <p className="text-lg text-gray-500">{category}</p>
          </div>
          <div className="w-full">
            <p className="text-left font-bold">Progress</p>
            <progress
              className={`progress w-full bg-white progress-black`}
              value={progress}
              max="100"
            ></progress>
            <p className="text-right font-bold">{progress} %</p>
          </div>
        </div>
        <div>
          <div className="flex">
            {members.map((member, index) => {
              return (
                <img
                  key={index}
                  src={member.image}
                  className="rounded-full object-cover w-9 h-9"
                />
              );
            })}
          </div>
        </div>
      </div>
    </Link>
  );
};

export const DashboardScreen = () => {
  const { usuario } = useSession(); //datos del usuario y función para el login y cerrar sesión

  const { proyectos } = useProject();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getUserTasks = async () => {
      try {
        const response = await clienteAxios.get(
          `/api/tasks/getUserTasksCalendar/${usuario.id}`
        );
        setTasks(response.data);
      } catch (error) {
        console.log("Error al obtener las tareas:", error);
      }
    };

    getUserTasks();
  }, [usuario.id]);

  const [openModal, setOpenModal] = useState(false);

  const onClose = () => {
    setOpenModal(false)
  }

  return (
    <>

      <div
        //Acá usualmente sería 5 rem de pt, por los 5 rem de h del header, pero pongo 6 para que no quede justo
        className="w-full h-full overflow-hidden pt-[6rem] md:pt-[3rem] lg:pt-0 pb-[4rem] flex justify-center"
      >
        <CreateProjectModal openModal={openModal} onClose={onClose}/>
        <div className="flex flex-col w-[90%] lg:w-full lg:flex-row-reverse">
          <div className="flex flex-col items-center w-full lg:w-[30rem] lg:bg-[#F7F7F7] lg:h-screen lg:overflow-auto">
            <h1 translate="no" className="text-[1.8rem] font-semibold text-center font-prompt lg:hidden">
              Bienvenido {usuario.name}
            </h1>
            <div className="flex w-full justify-between px-5 pt-3">
              <TitleSection
                title={"Mi perfil"}
                className={"hidden lg:block "}
              />
              <img
                src={threeDotsProfile}
                alt=""
                className="hidden lg:block w-7"
              />
            </div>
            <div className="rounded-full shadow-xl w-[13rem] h-[13rem]">
              <img
                src={usuario.image}
                alt=""
                className="rounded-full w-full h-full object-cover p-3"
              />
            </div>
            <div className="mt-4 text-center text-[1.2rem]">
              <p translate="no" className="font-inter font-semibold ">{usuario.name}</p>
            </div>
            <div className="bg-[#F7F7F7] rounded-xl w-full py-3 px-4 font-inter mt-4 lg:px-6">
              {/* <div className="flex justify-between">
                <p className="font-semibold">Mensajes</p>
                <div className="flex items-center gap-1">
                  <p>Ver más </p>
                  <MdKeyboardArrowDown />
                </div>
              </div> */}
              <div className="mt-3 space-y-3">
                {/* <MessageComponent
                  name={"Florencio Dorrance"}
                  message={"How is the project going?"}
                  img={
                    "https://i.pinimg.com/564x/64/8e/cc/648ecc03733843da141ab9d3400808e5.jpg"
                  }
                />
                <MessageComponent
                  name={"Jamel Eusebio"}
                  message={"The fugging design is done"}
                  img={
                    "https://i.pinimg.com/564x/31/a6/26/31a6267a098dc64421d445ec8d91696a.jpg"
                  }
                />
                <MessageComponent
                  name={"Benny Spanbauer"}
                  message={"get the job done man cmon"}
                  img={
                    "https://i.pinimg.com/564x/fd/90/23/fd902362a39ef9b403f6f766f50ef5c5.jpg"
                  }
                /> */}
                {/**Acá el calendario en pequeño */}
                <MiniCalendar tasks={tasks} />
              </div>
            </div>
            {/* <div className="bg-[#F7F7F7] rounded-xl w-full px-3 pt-3 pb-4 font-inter mt-4 lg:px-6">
              <div className="flex justify-between">
                <p className="font-semibold">Invitaciones</p>
                <div className="flex items-center gap-1">
                  <p>Ver más </p>
                  <MdKeyboardArrowDown />
                </div>
              </div>
              <div className="mt-3 space-y-5">
                <p>
                  Tienes <span className="font-semibold">6 invitaciones</span> a
                  proyectos
                </p>
                <div className="flex items-center gap-3 bg-white pl-2 py-1">
                  <div className="bg-black min-h-10 min-w-10 rounded-full grid place-content-center">
                    <img src={mailIcon} alt="" className="w-5 h-5" />
                  </div>
                  <div className="flex justify-between w-full items-center">
                    <div>
                      <p className="font-medium">Alphonse Elric</p>
                      <p className="text-[.85rem]">Alphonse te ha invitado</p>
                    </div>
                    <MdKeyboardArrowRight size={35} />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div
            className="mt-[4rem] lg:mt-[2.2rem] lg:w-[90%] lg:ml-12 lg:mr-12 xl:ml-14 xl:mr-0 lg:overflow-auto lg:h-screen lg:pb-[15rem] "
            style={{ scrollbarColor: "transparent transparent" }}
          >
            <div className="space-y-6">
              <TitleSection title={"Projectos recientes"} />

              <div className="flex flex-col gap-3 mt-7 md:mt-0 lg:gap-5 lg:w-full lg:flex-row lg:flex-wrap ">
                {proyectos.slice(0, 4).map((proyecto, index) => {
                
                  return (
                    <ProjectCard
                      key={proyecto.id}
                      id={proyecto.id}
                      title={proyecto.name}
                      image={proyecto.imagen}
                      date={format(new Date(proyecto.createdAt), "PP")}
                      category={"Prototyping"}
                      members={proyecto.users}
                      progress={proyecto.percentage}
                    />
                  );
                })}
                {proyectos.length < 4 && (
                  <div
                    className="border-2 border-gray-400 border-dashed flex items-center justify-center px-6 py-4 rounded-3xl space-y-1 lg:w-full xl:w-[45%] cursor-pointer"
                    onClick={() => setOpenModal(true)}// Asegúrate de definir esta función para manejar el click
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-4xl text-gray-400">+</span>
                      <p className="text-gray-400">Crear nuevo proyecto</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
