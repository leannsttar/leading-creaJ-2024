import { useState, useEffect, useContext } from "react";

import { Link, useLocation, Outlet, useParams } from "react-router-dom";

import { ProyectosProvider } from "@/config/ProyectosContext";
import { ProyectosContext } from "@/config/ProyectosContext";

import { Loader } from "./Loader";

import { clienteAxios } from "@/config/clienteAxios";
import { useSession } from "@/config/useSession";

import configIcon from "../assets/configIcon.svg";
import threeDotsSmaller from "../assets/threeDotsSmaller.svg";
import plusIcon from "../assets/plusIcon.svg";
import usersProjectIcon from "../assets/usersProjectIcon.svg";
import editIcon from "../assets/editIcon.svg";

import { Modal, Form, Input, message, Image } from "antd";

import { MobileSideBar, SideBar } from "./SideBar.jsx";
import { HeaderMobileWorkspace } from "./HeaderMobileWorkspace.jsx";

let isMobile = window.innerWidth < 1024;

const checkResolution = () => {
  const screenWidth = window.innerWidth;
  isMobile = screenWidth < 1024;
};

checkResolution();
window.addEventListener("resize", checkResolution);

const MiniTabLink = ({ title, notification, href }) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(location.pathname === href);
  }, [location.pathname, href]);

  return (
    <Link to={href}>
      <p
        className={` pb-2 lg:pb-1 px-2 hover:text-black truncate cursor-pointer border-b-[3px] border-white hover:border-black md:px-6 ${
          isActive ? "text-black border-b-black" : ""
        } ${notification ? "hover:border-[#625DF5] border-b-[3px]" : ""}`}
      >
        {title}
      </p>
    </Link>
  );
};

const AvatarMember = ({ img, className, index }) => {
  return (
    <img
      key={index}
      src={img}
      alt=""
      className={`w-8 h-8 rounded-full object-cover ${className}`}
    />
  );
};

export const LayoutHome = () => {
  const { logout, usuario } = useSession(); //datos del usuario y función para el login y cerrar sesión

  return (
    <div className="w-full md:max-h-screen lg:overflow-y-hidden md:pt-[5rem] lg:pt-0">
      <div className="h-[10rem] px-10 w-full items-center hidden lg:flex">
        <div className="flex justify-between items-center w-full">
          <div>
            <p className="text-[2rem] font-semibold">
              Bienvenido {usuario.name}
            </p>
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
              <p className="hidden xl:block">Nuevo proyecto</p>
            </div>
          </div>
        </div>
      </div>

      <hr className="hidden lg:block" />
      <div
        className="w-full overflow-auto"
        style={{
          height: isMobile ? "" : "calc(100vh - 10rem)",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

const LayoutTasks = () => {
  return (
    <>
      <div className="w-full max-h-screen overflow-y-hidden">
        <div className="h-[6rem] px-5 w-full flex items-center justify-between mt-[5rem] lg:h-[10rem] lg:px-10 lg:mt-0 ">
          <div className="flex flex-col h-full justify-between w-full lg:w-auto">
            <div className="flex flex-col gap-1 justify-center lg:justify-normal lg:gap-0 lg:flex-row lg:items-center w-full lg:mt-[3rem]">
              <div className="flex justify-between">
                <p className="text-[2rem] font-semibold">Mis Tareas</p>
                <div className="bg-black rounded-md text-white flex gap-3 items-center p-3 h-fit cursor-pointer lg:hidden">
                  <img src={plusIcon} alt="" className="w-4 h-4" />
                </div>
              </div>
            </div>
            <div className="flex gap-6 text-[#7C7C7C] ">
              <MiniTabLink title={"Tablero"} href={"/dashboard/tasks"} />
              <MiniTabLink title={"Lista"} href={"/dashboard/tasks/list"} />
              <MiniTabLink
                title={"Calendario"}
                href={"/dashboard/tasks/calendar"}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="hidden border-[1px] rounded-md h-[2.7rem] w-[2.7rem] lg:grid place-items-center cursor-pointer">
              <img src={configIcon} alt="" />
            </div>
            <div className=" hidden border-[1px] rounded-md h-[2.7rem] w-[2.7rem] lg:grid place-items-center cursor-pointer">
              <img src={threeDotsSmaller} alt="" />
            </div>
            <div className="hidden bg-black rounded-md text-white lg:flex gap-3 items-center py-2 px-3 cursor-pointer">
              <img src={plusIcon} alt="" className="w-4" />
              <p>Nueva tarea</p>
            </div>
          </div>
        </div>
        <hr />
        <div
          className="w-full overflow-auto hidden lg:block"
          style={{
            height: isMobile ? "calc(100vh - 11rem)" : "calc(100vh - 10rem)",
          }}
        >
          <Outlet />
        </div>
      </div>
      <div
        className="w-full lg:hidden"
        style={{
          height: isMobile ? "calc(100vh - 11rem)" : "calc(100vh - 10rem)",
        }}
      >
        <Outlet />
      </div>
    </>
  );
};

const LayoutProject = () => {
  const { proyectos, projectChange } = useContext(ProyectosContext);

  const { logout, usuario, userToken } = useSession();
  const params = useParams();
  const [project, setProject] = useState("loading");
  const [projectt, setProjectt] = useState("loading");
  const [modal1Open, setModal1Open] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");

  useEffect(() => {
    if (proyectos.length > 0) {
      const projectFound = proyectos.find(
        (proyecto) => proyecto.id == params.id
      );
      if (projectFound) {
        setProject(projectFound);
      } else {
        setProject(null); // o algún otro valor que indique que no se encontró el proyecto
      }
    }
  }, [params.id, proyectos]);

  // useEffect(() => {
  //   const fetchProject = async () => {
  //     setProject("loading");
  //     try {
  //       const response = await clienteAxios.get(
  //         `/api/projects/getProject/${params.id}`
  //       );

  //       setProject(response.data);
  //       console.log(response.data)
  //     } catch (error) {
  //       console.log("Error al obtener el proyecto:", error);
  //     }
  //   };
  //   fetchProject();
  // }, [params.id]);

  const tabLinksProject = [
    { title: "Vista general", href: `/dashboard/project/${params.id}` },
    { title: "Tablero", href: `/dashboard/project/${params.id}/board` },
    { title: "Timeline", href: `/dashboard/project/${params.id}/timeline` },
    { title: "Reuniones", href: `/dashboard/project/${params.id}/meetings` },
    { title: "Archivos", href: `/dashboard/project/${params.id}/files` },
    { title: "Configuración", href: `/dashboard/project/${params.id}/config` },
  ];

  const [messageApi, contextHolder] = message.useMessage();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onFinish = async () => {
    try {
      if (!newMemberEmail) {
        messageApi.open({
          type: "error",
          content: "Por favor, ingresa un correo.",
        });
        return;
      }

      if (!emailRegex.test(newMemberEmail)) {
        messageApi.open({
          type: "error",
          content: "Por favor, ingresa un correo válido.",
        });
        return;
      }

      const formData = new FormData();
      formData.append("correo", newMemberEmail);
      formData.append("proyectoId", params.id);
      const response = await clienteAxios.postForm(
        "/api/projects/addMember",
        formData,
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      );
      projectChange();
      setModal1Open(false);
      console.log("Respuesta del backend:", response.data);
    } catch (error) {
      console.error("Error al enviar los datos", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Fallo:", errorInfo);
  };

  if (project == "loading" || project == undefined) return <Loader screen />;
  return (
    <>
      {contextHolder}
      <div className="w-full max-h-screen overflow-hidden">
        <div className="h-[6rem] px-5 w-full flex items-center justify-between mt-[5rem] lg:h-[10rem] lg:px-10 lg:mt-0 ">
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col gap-1 justify-center w-full lg:mt-[1rem]">
              <div className="flex gap-2 items-center">
                
                <Image
                  width={35}
                  src={`http://localhost:5000/${project.imagen}`}
                  className="rounded-md"
                  
                />
                <p className="text-[1.8rem] font-semibold">{project.name}</p>
                <img src={editIcon} alt="" className="w-6 h-6 ml-3" />
              </div>
              <div className="hidden lg:flex items-center gap-3 mt-1">
                <img src={usersProjectIcon} alt="" />
                <p>Asignar al proyecto</p>
                <div className="flex">
                  {project !== "loading" && project.users && (
                    <div className="flex">
                      {project.users.slice(0, 3).map((user, index) => (
                        <AvatarMember
                          key={index}
                          img={`http://localhost:5000/${user.image}`}
                        />
                      ))}
                      {project.users.length > 3 && (
                        <div className="bg-[#D9D9D9] w-8 h-8 flex justify-center items-center rounded-full relative right-6 font-semibold">
                          <p>{project.users.length - 3} +</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setModal1Open(true)}
                  className="px-4 py-2 bg-[#D6EAF5] text-[#0070D8] font-semibold rounded-3xl"
                >
                  Añadir miembro
                </button>
              </div>
            </div>
            <div className="flex gap-3 text-[#7C7C7C] overflow-x-scroll w-screen lg:w-auto lg:gap-6 lg:overflow-x-auto pr-7 lg:px-0">
              {tabLinksProject.map((link, index) => {
                return (
                  <div key={index}>
                    <MiniTabLink title={link.title} href={link.href} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Modal
          title="Añadir miembro"
          okButtonProps={{
            style: { backgroundColor: "black", color: "white" },
          }}
          okText="Añadir"
          centered
          open={modal1Open}
          onOk={onFinish}
          onCancel={() => setModal1Open(false)}
        >
          {/* <div className="flex flex-col gap-1">
            <label htmlFor="">Escriba el correo del usuario</label>
            <input
              onChange={(e) => setNewMemberEmail(e.target.value)}
              className="bg-[#f5f5f5] px-3 py-2 rounded-lg outline-none"
              type="text"
              placeholder="correo@gmail.com"
            />
          </div> */}
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="correo"
              rules={[
                {
                  required: true,
                  message: "Ingresa un correo",
                },
              ]}
            >
              <div className="space-y-1">
                <p>Escriba el correo del usuario</p>
                <Input
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  placeholder="correo@gmail.com"
                />
              </div>
            </Form.Item>
          </Form>
        </Modal>
        <hr />
        <div
          className="w-full overflow-auto hidden lg:block "
          style={{
            height: isMobile ? "calc(100vh - 11rem)" : "calc(100vh - 10rem)",
          }}
        >
          <Outlet />
        </div>
      </div>
      <div
        className="w-full lg:hidden"
        style={{
          height: isMobile ? "calc(100vh - 11rem)" : "calc(100vh - 10rem)",
        }}
      >
        <Outlet />
      </div>
    </>
  );
};

const LayoutNotifications = () => {
  return (
    <>
      <div className="w-full max-h-screen overflow-y-hidden">
        <div className="h-[6rem] px-5 w-full flex items-center justify-between mt-[5rem] lg:h-[10rem] lg:px-10 lg:mt-0">
          <div className="flex flex-col h-full justify-between w-full lg:w-auto">
            <div className="flex flex-col gap-1 justify-center lg:justify-normal lg:gap-0 lg:flex-row lg:items-center w-full lg:mt-[3rem]">
              <div>
                <p className="text-[2rem] font-semibold">Notificaciones</p>
              </div>
            </div>
            <div className="flex gap-6 text-[#7C7C7C] overflow-x-scroll lg:overflow-x-auto ">
              <MiniTabLink title={"Vista General"} />
              <MiniTabLink title={"Invitaciones"} />
              <MiniTabLink title={"Comentarios"} />
            </div>
          </div>
          <div className=" gap-2 hidden">
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
        <div
          className="w-full overflow-auto hidden lg:block"
          style={{
            height: isMobile ? "calc(100vh - 11rem)" : "calc(100vh - 10rem)",
          }}
        >
          <Outlet />
        </div>
      </div>
      <div
        className="w-full lg:hidden"
        style={{
          height: isMobile ? "calc(100vh - 11rem)" : "calc(100vh - 10rem)",
        }}
      >
        <Outlet />
      </div>
    </>
  );
};

const LayoutMessages = () => {
  return (
    <div
      className="w-full"
      style={{
        height: isMobile ? "calc(100vh - 11rem)" : "calc(100vh - 10rem)",
      }}
    >
      <Outlet />
    </div>
  );
};

export const LayoutWorkspace = () => {
  const location = useLocation();
  const { pathname } = location;

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    document.body.classList.remove("overflow-hidden");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    // Se llama para que cuando cargue se ponga el valor inicial
    handleResize();

    // Listener para detectar el resize
    window.addEventListener("resize", handleResize);

    // Se quita por problemas de memoria
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderComponentBasedOnPath = () => {
    switch (true) {
      case pathname.startsWith("/dashboard/project"):
        return <LayoutProject />;
      case pathname === "/dashboard":
        return <LayoutHome />;
      case pathname.startsWith("/dashboard/tasks"):
        return <LayoutTasks />;
      case pathname === "/dashboard/notifications":
        return <LayoutNotifications />;
      case pathname === "/dashboard/messages":
        return <LayoutMessages />;
      default:
        return null;
    }
  };

  return (
    <>
      {isDesktop ? (
        <div className="flex font-inter">
          <ProyectosProvider>
            <SideBar />
            {renderComponentBasedOnPath()}
          </ProyectosProvider>
        </div>
      ) : (
        <div className="flex flex-col font-inter">
          {isSidebarOpen && (
            <div
              className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-[12]"
              onClick={closeSidebar}
            ></div>
          )}
          <HeaderMobileWorkspace
            isOpen={isSidebarOpen}
            onToggle={toggleSidebar}
          />
          <MobileSideBar isOpen={isSidebarOpen} onClose={closeSidebar} />
          {renderComponentBasedOnPath()}
        </div>
      )}
    </>
  );
};
