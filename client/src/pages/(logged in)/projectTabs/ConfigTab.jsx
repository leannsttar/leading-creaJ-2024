import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { clienteAxios } from "@/config/clienteAxios";
import { useSession } from "@/config/useSession";

import { ProyectosContext } from "@/config/ProyectosContext";

import { Loader } from "@/components/Loader";

import projectImage from "../../../assets/projectImage.jpg";
import threeDots from "../../../assets/threeDotsIcon.svg";

import { IoSearchOutline } from "react-icons/io5";

import {
  Table,
  Button,
  Dropdown,
  Space,
  Modal,
  Checkbox,
  Form,
  Input,
  Upload,
  message,
} from "antd";

import TextArea from "antd/es/input/TextArea";

const ButtonConfig = ({
  text,
  onClick,
  isActive,
  action,
  textCenter,
  save,
}) => {
  return (
    <button
      className={` rounded-lg px-3 py-2 ${
        save ? "bg-black text-white hover:bg-[#2b2b2b]" : "hover:bg-[#f0f0f0]"
      } ${textCenter ? "text-center" : "text-left"} ${
        isActive ? "bg-[#f0f0f0]" : action ? "bg-[#f0f0f0]" : ""
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const TableFileRecord = ({ userName, userPicture, email, role }) => {
  return (
    <>
      <tr className="border-t-[1px] border-b-[1px] border-[#ececec]">
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-7 h-7">
                <img
                  src={userPicture}
                  alt="Avatar"
                  className="rounded-full object-cover w-[4rem]"
                />
              </div>
            </div>
            <div>
              <div className="font-semibold">{userName}</div>
            </div>
          </div>
        </td>
        <td className="font-semibold">{email}</td>
        <td className="font-semibold">{role}</td>
        <th>
          <button className="btn btn-ghost btn-xs">
            <img src={threeDots} alt="" />
          </button>
        </th>
      </tr>
    </>
  );
};

export const ConfigTab = () => {
  const { proyectos, editProject } = useContext(ProyectosContext);

  const { logout, usuario, userToken, updateUserInfo } = useSession();

  const imageInputRef = useRef();

  const [layout, setLayout] = useState("Detalles");

  const params = useParams();
  const [project, setProject] = useState("loading");

  const [dataSource, setDataSource] = useState([]);
  const [leader, setLeader] = useState("");

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectImage, setProjectImage] = useState();

  const handleImageChange = (e) => {
    setProjectImage(e.target.files[0]);
  };

  const handleUploadImage = () => {
    imageInputRef.current.click();
  };

  const getProject = async () => {
    try {
      const response = await clienteAxios.get(
        `/api/projects/getProjectConfig/${params.id}`
      );

      setProject(response.data);
      setProjectName(response.data.name);
      setProjectDescription(response.data.description);
      setDataSource(
        response.data.users.map((user) => {
          // Find corresponding teamProject entry for the user
          const teamProjectEntry = response.data.team.find(
            (teamMember) => teamMember.user.id === user.id
          );

          // Extract role from teamProject (handle missing role gracefully)
          const role = teamProjectEntry?.role || "Unknown"; // Use 'Unknown' if role is missing
          if (role === "leader") {
            setLeader(user);
          }
          return {
            key: user.id,
            picture: (
              <img
                src={`http://localhost:5000/${user.image}`}
                className="rounded-full min-w-[3rem] min-h-[3rem] max-w-[3rem] max-h-[3rem]"
                alt=""
              />
            ),
            name: user.name,
            age: user.email,
            address:
              role === "leader"
                ? "Líder"
                : role === "member"
                ? "Miembro"
                : "",
            action: <img src={threeDots} className="cursor-pointer" />,
          };
        })
      );
    } catch (error) {
      console.log("Error al obtener el proyecto:", error);
    }
  }

  useEffect(() => {
    getProject()
  }, [params.id]);


  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async () => {
  try {
    if (projectName == "" || projectDescription == "") {
      messageApi.open({
        type: "error",
        content: "No puedes dejar los campos en blanco",
      });
      return;
    }

    const formData = new FormData();

    if (projectImage) {
      formData.append("imagen", projectImage);
    }

    formData.append("id", params.id);
    formData.append("nombre", projectName);
    formData.append("descripcion", projectDescription);

    const response = await clienteAxios.postForm(
      "/api/projects/updateProject",
      formData,
      {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      }
    );

    editProject(response.data)
    getProject()

    messageApi.open({
      type: "success",
      content: "Datos del proyecto actualizados",
    });

    const updatedProject = {
      ...project,
      name: projectName,
      imagen: response.data.imagen, // Agregamos la imagen al objeto updatedProject
    };

    setProyectos(proyectos.map((p) => (p.id === project.id ? updatedProject : p)));


    console.log("Respuesta del backend:", response.data);
  } catch (error) {
    console.error("Error al enviar los datos", error);
  }
};

  const columns = [
    {
      title: "Foto",
      dataIndex: "picture",
      key: "picture",
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Rol",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Acción",
      dataIndex: "action",
      key: "action",
    },
  ];

  if (project == "loading") return <Loader />;

  return (
    <>
      {contextHolder}
      <div className="m-5 lg:my-9 lg:mx-14 xl:my-14 xl:mx-36 pb-16 lg:flex lg:p-4 lg:bg-[#F7F7F7] lg:gap-5 lg:rounded-xl">
        <div className="flex gap-3 lg:gap-1 mb-1 lg:flex-col lg:min-w-[17rem] lg:max-w-[17rem] lg:h-[624px] lg:bg-[#ffffff] lg:p-2 lg:rounded-xl">
          <div className="hidden lg:flex items-center gap-3 m-2">
            <img
              src={`http://localhost:5000/${project.imagen}`}
              alt=""
              className="rounded-md min-w-[2.5rem] min-h-[2.5rem] max-w-[2.5rem] max-h-[2.5rem] object-cover"
            />
            <p className="font-semibold">{project.name}</p>
          </div>
          <ButtonConfig
            text={"Detalles"}
            onClick={() => setLayout("Detalles")}
            isActive={layout === "Detalles"}
          />
          <ButtonConfig
            text={"Acceso"}
            onClick={() => setLayout("Acceso")}
            isActive={layout === "Acceso"}
          />
        </div>
        <hr className="mb-4 lg:hidden" />
        {layout === "Detalles" ? (
          <div className="lg:w-full lg:p-10 space-y-3 lg:space-y-5">
            <p className="text-2xl font-semibold lg:text-3xl">Detalles</p>
            <div className="flex justify-center">
              <div className="lg:w-[95%] 2xl:w-[80%] lg:flex lg:flex-col lg:gap-7">
                <div className="space-y-5 mb-3 ">
                  <div className="lg:flex lg:gap-[2rem]">
                    <div className="flex flex-col items-center gap-4">
                      {projectImage ? (
                        <img
                          src={URL.createObjectURL(projectImage)}
                          alt=""
                          className="w-[60%] rounded-lg lg:max-w-[10rem] lg:min-w-[10rem] lg:min-h-[10rem] lg:max-h-[10rem] object-cover"
                        />
                      ) : (
                        <img
                          src={`http://localhost:5000/${project.imagen}`}
                          alt=""
                          className="w-[60%] rounded-lg lg:max-w-[10rem] lg:min-w-[10rem] lg:min-h-[10rem] lg:max-h-[10rem] object-cover"
                        />
                      )}
                      <input
                        type="file"
                        ref={imageInputRef}
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                      <ButtonConfig
                        text={"Cambiar imagen"}
                        textCenter
                        action
                        onClick={handleUploadImage}
                      />
                    </div>
                    <div className="lg:flex flex-col gap-1 hidden lg:w-full">
                      <label htmlFor="" className="font-semibold">
                        Descripción
                      </label>

                      <textarea
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        className="text-[#00000080] h-full w-full p-2 border-[1px] border-[#d8d8d8] rounded-lg resize-none	"
                        name=""
                        id=""
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 lg:space-y-6">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="font-semibold">
                      Nombre
                    </label>
                    <input
                      value={projectName || ""}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="py-3 px-4 text-[#00000080] border-[1px] border-[#d8d8d8] rounded-lg"
                      type="text"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="flex flex-col gap-1 relative">
                    <label htmlFor="" className="font-semibold">
                      Líder del proyecto
                    </label>
                    <img
                      src={`http://localhost:5000/${leader.image || ""}`}
                      alt=""
                      className="w-8 h-8 object-cover rounded-full absolute top-9 left-2.5"
                    />
                    <input
                      value={leader.name || ""}
                      readOnly
                      className="py-3 pl-12 pr-4 text-[#00000080] border-[1px] border-[#d8d8d8] rounded-lg"
                      type="text"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="flex flex-col gap-1 lg:hidden">
                    <label htmlFor="" className="font-semibold">
                      Descripción
                    </label>
                    <textarea
                      value={project.description || ""}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      className="text-[#00000080] h-[9rem] p-2 border-[1px] border-[#d8d8d8] rounded-lg resize-none	"
                      name=""
                      id=""
                    ></textarea>
                  </div>
                  <div onClick={onFinish}>
                    <ButtonConfig
                      text={"Guardar cambios"}
                      className={"bg-[#f1f1f1]"}
                      save
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:w-full lg:p-10 space-y-3 lg:space-y-5">
            <p className="text-2xl font-semibold lg:text-3xl">Acceso</p>
            <div className="space-y-5 mb-3">
              <div className="relative">
                <IoSearchOutline
                  color="#B0BABF"
                  size={20}
                  className="absolute top-3.5 left-2.5"
                />
                <input
                  placeholder="Busca por nombre o correo"
                  className="lg:w-[20rem] py-3 pl-9 pr-4 text-[#00000080] border-[1px] border-[#d8d8d8] rounded-lg"
                  type="text"
                  name=""
                  id=""
                />
              </div>
            </div>
            {project === "loading" && <p>Cargando usuarios...</p>}
            {dataSource.length > 0 && (
              <div className="overflow-auto">
                <Table
                  dataSource={dataSource}
                  columns={columns}
                  pagination={false}
                />
              </div>
            )}
            {dataSource.length === 0 && project !== "loading" && (
              <p>No se encontraron usuarios para este proyecto.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};
