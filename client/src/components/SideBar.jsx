import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import dashboardIcon from "../assets/dashboardIcon.svg";
import tasksIcon from "../assets/tasksIcon.svg";
import messagesIcon from "../assets/messagesIcon.svg";
import notificationIcon from "../assets/notificationIcon.svg";
import addProjectIcon from "../assets/addProjectIcon.svg";
import sunLightMode from "../assets/sunLightMode.svg";
import moonDarkMode from "../assets/moonDarkMode.svg";
import threeDotsIcon from "../assets/threeDotsIcon.svg";
import threeDots from "../assets/threeDotsSmaller.svg";
import threeLinesMenu from "../assets/3linesMenu.svg";

// Sesión
import { clienteAxios } from "@/config/clienteAxios";
import { useSession } from "@/config/useSession";

import avatar from "../assets/Avatar.jpg";

import {
  Button,
  Dropdown,
  Space,
  Modal,
  Checkbox,
  Form,
  Input,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import ImgCrop from "antd-img-crop";
import axios from "axios";

const navLinks = [
  { title: "Panel", href: "/dashboard", img: dashboardIcon },
  { title: "Tareas", href: "/dashboard/tasks", img: tasksIcon },
  { title: "Mensajes", href: "/dashboard/messages", img: messagesIcon },
  {
    title: "Notificaciones",
    href: "/dashboard/notifications",
    img: notificationIcon,
  },
];

const navLinksMobile = [
  { title: "Panel", href: "/dashboard", img: dashboardIcon },
  { title: "Tareas", href: "/dashboard/tasks", img: tasksIcon },
  { title: "Mensajes", href: "/dashboard/messages", img: messagesIcon },
];

const SideBarLink = ({ name, img, href, isProject, isShrinked }) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (href) {
      if (href.startsWith("/dashboard/project")) {
        setIsActive(location.pathname.startsWith(href));
      } else {
        setIsActive(location.pathname === href);
      }
    }
  }, [location.pathname, href]);

  return isProject ? (
    <Link to={href}>
      <div
        className={`flex items-center gap-4 py-[0.40rem] px-2 hover:bg-[#f1eefd] rounded-lg cursor-pointer relative ${
          isActive ? "bg-[#f1eefd]" : ""
        }`}
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
        className={`flex gap-4 py-[0.60rem] px-3 hover:bg-[#EBF1FD] rounded-lg cursor-pointer ${
          isActive ? "bg-[#EBF1FD]" : ""
        }`}
      >
        <img src={img} alt={`${img}`} className="w-5" />
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
  const { logout, usuario, userToken } = useSession();

  

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    const obtenerProyectos = async () => {
      try {
        const response = await clienteAxios.get("/api/projects");
        console.log(response.data);
        setProyectos(response.data);
      } catch (error) {
        console.log("Error al obtener los proyectos:", error);
      }
    };

    obtenerProyectos();
  }, []);

  const [isDark, setIsDark] = useState(false);
  const [isShrinked, setIsShrinked] = useState(window.innerWidth < 1280);
  const [isLowRes, setIsLowRes] = useState(window.innerHeight < 730);

  const [createProjectName, setCreateProjectName] = useState();
  const [createProjectDescription, setCreateProjectDescription] = useState();
  const [createProjectFile, setCreateProjectFile] = useState();

  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);

  const onFinish = async () => {
    try {
      const fileImg = fileList.map(file => file.originFileObj)[0]
      
      console.log(createProjectDescription);
      
      const formData = new FormData();
      
      formData.append("imagen", fileImg);
      formData.append("nombre", createProjectName);
      formData.append("descripcion", createProjectDescription);


      const response = await clienteAxios.postForm("/api/projects", formData, {
        headers: {
          Authorization: 'Bearer '+userToken
        }
      });

      console.log("Respuesta del backend:", response.data);
      // setModal2Open(false); 
    } catch (error) {
      console.error("Error al enviar los datos", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Fallo:", errorInfo);
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  useEffect(() => {
    const checkResolution = () => {
      const screenHeight = window.innerHeight;
      setIsLowRes(screenHeight < 1280);
    };

    checkResolution();
    window.addEventListener("resize", checkResolution);

    return () => {
      window.removeEventListener("resize", checkResolution);
    };
  }, []);

  const changeMode = () => {
    setIsDark(!isDark);
  };

  const changeView = () => {
    setIsShrinked(!isShrinked);
  };

  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Editar perfil
        </a>
      ),
    },
    {
      key: "2",
      label: <a onClick={() => setModal1Open(true)}>Cerrar sesión</a>,
    },
  ];

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
                  onClick={() => setModal2Open(true)}
                  src={addProjectIcon}
                  alt="Icono añadir proyecto"
                  className={`cursor-pointer ${isShrinked && "h-[18px]"}`}
                />
              </div>
              <div className="mt-3 flex flex-col gap-1 lg:h-[10rem] ">
                {proyectos &&
                  proyectos.map((proyecto) => 
                    {return (
                      <SideBarLink
                      key={proyecto.id}
                      name={proyecto.name}
                      img={`http://localhost:5000${proyecto.img}`}
                      isProject
                      isShrinked={isShrinked}
                      href={`/dashboard/project/${proyecto.id}`}/>
                    )}
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-3 2xl:gap-6">
        {!isLowRes ? (
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              className="theme-controller"
              value="synthwave"
            />

            {/* sun icon */}
            <svg
              className="swap-off fill-current w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-on fill-current w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        ) : (
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
                className={`invisible ${
                  isShrinked ? "px-2 py-4" : "py-2 px-4"
                } `}
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
        )}

        <hr />
        <div className="flex items-center justify-between mb-1 2xl:mb-5">
          <div className="flex gap-2 items-center justify-between">
            <img
              src={avatar}
              alt=""
              className="min-w-[3rem] min-h-[3rem] max-w-[3rem] max-h-[3rem] rounded-full object-cover"
            />
            <div
              className={`${isShrinked ? "opacity-0" : ""}`}
              style={{ whiteSpace: "nowrap", transition: "all 250ms ease" }}
            >
              <p className="font-semibold">{usuario.name}</p>
              <p className="text-[.7rem] text-[#667085]">{usuario.email}</p>
            </div>
          </div>
          <Dropdown
            menu={{
              items,
            }}
            placement="top"
          >
            <Button
              className={`px-2 py-4 flex items-center ${
                isShrinked ? "opacity-0 absolute" : ""
              } `}
            >
              <img
                src={threeDots}
                alt=""
                className={`cursor-pointer  ${
                  isShrinked ? "opacity-0 absolute" : ""
                }`}
                style={{
                  transition: "opacity 150ms ease",
                  transition: "position 300ms ease",
                }}
              />
            </Button>
          </Dropdown>
          <Modal
            title="Cerrar sesión"
            okButtonProps={{ style: { backgroundColor: "red" } }}
            okText="Cerrar sesión"
            centered
            open={modal1Open}
            onOk={logout}
            onCancel={() => setModal1Open(false)}
          >
            <p>
              ¿Estás seguro que quieres cerrar sesión? Una vez que cierras
              sesión tendrás que iniciar sesión de nuevo
            </p>
          </Modal>
          <Modal
            title="Crear un nuevo proyecto"
            okButtonProps={{
              style: { backgroundColor: "black", color: "white" },
            }}
            okText="Crear proyecto"
            centered
            open={modal2Open}
            onOk={onFinish}
            onCancel={() => setModal2Open(false)}
          >
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="projectImage"
                rules={[
                  {
                    required: false,
                    message: "Suba una iamgen!",
                  },
                ]}
              >
                <ImgCrop
                  rotationSlider
                  okButtonProps={{
                    style: { backgroundColor: "black", color: "white" },
                  }}
                >
                  <Upload
                    listType="picture-card"
                    onChange={onChange}
                    onPreview={onPreview}
                    maxCount={1}
                  >
                    {"+ Upload"}
                  </Upload>
                </ImgCrop>
              </Form.Item>
              <Form.Item
                name="nombre"
                rules={[
                  {
                    required: true,
                    message: "Ingresa un nombre",
                  },
                ]}
              >
                <Input
                  onChange={(e) => setCreateProjectName(e.target.value)}
                  placeholder="Ingresa el nombre del proyecto"
                />
              </Form.Item>
              <Form.Item
                name="descripcion"
                rules={[
                  {
                    required: false,
                    message: "Please input your password!",
                  },
                ]}
              >
                <TextArea
                  onChange={(e) => setCreateProjectDescription(e.target.value)}
                  placeholder="Ingrese una descripción"
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </aside>
  );
};

export const MobileSideBar = ({ isOpen, onClose }) => {
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
      className={`fixed z-20 w-[20rem] font-inter flex flex-col justify-between border-r-[1px] bg-white ${
        isOpen ? "" : "-translate-x-[100vw]"
      }`}
      style={{
        minHeight: "-webkit-fill-available",
        transitionTimingFunction: "cubic-bezier(.3,.65,.36,.66)",
        transition: "all 500ms",
      }}
    >
      <div>
        <div
          className={`flex items-center gap-3 px-6 h-[5rem] justify-between ${
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
          <div className="bg-[#ebebeb] p-2 rounded-full">
            <MdKeyboardArrowLeft
              size={30}
              onClick={onClose}
              className="cursor-pointer"
            />
          </div>
        </div>
        <hr className="w-[85%] m-auto" />
        <div className="p-4">
          <div>
            <div className="mt-1 space-y-[0.40rem] text-[#000000] pb-5 ">
              {navLinksMobile.map((link, index) => {
                return (
                  <div
                    key={index}
                    className="overflow-hidden"
                    onClick={onClose}
                  >
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
              <div className="mt-3 space-y-1" onClick={onClose}>
                <SideBarLink
                  name={"Sao web project"}
                  img={
                    "https://i.pinimg.com/564x/e0/fc/a8/e0fca85a942e80d6cbb40787d59a3de1.jpg"
                  }
                  isProject
                  isShrinked={isShrinked}
                  href={"/dashboard/project"}
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
        <hr />
        <div className="flex gap-3 items-center justify-between mb-5">
          <div className="flex gap-3 items-center">
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
