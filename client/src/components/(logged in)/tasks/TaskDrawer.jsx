import React, { useState, useRef, useEffect, useContext, memo } from "react";

import { ProyectosContext } from "@/config/ProyectosContext";
import { useSession } from "@/config/useSession";

import { Loader } from "@/components/Loader";

import "../../../index.css";

import { useParams } from "react-router-dom";

import { format, formatDistanceToNow, parseISO } from "date-fns";
import { es } from "date-fns/locale";

import { clienteAxios } from "@/config/clienteAxios";

import LinkPreview from "@ashwamegh/react-link-preview";

// If you're using built in layout, you will need to import this css
import "@ashwamegh/react-link-preview/dist/index.css";

import { FaPlus } from "react-icons/fa6";
import { TbEdit } from "react-icons/tb";
import { PiListChecks } from "react-icons/pi";
import { PiList } from "react-icons/pi";

import { TaskCardProject } from "@/components/(logged in)/tasks/TaskCardProject";

import plusTasksIcon from "../../../assets/plusTasksIcon.svg";
import avatar from "../../../assets/Avatar.jpg";

import Microlink from "@microlink/react";
import styled, { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";

import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Flex,
  Progress,
  Checkbox,
  TreeSelect,
  message,
  Upload,
} from "antd";
const { Option } = Select;

import {
  InboxOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  SendOutlined,
  UploadOutlined,
} from "@ant-design/icons";
const { Dragger } = Upload;

const props = {
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange({ file, fileList }) {
    if (file.status !== "uploading") {
      console.log(file, fileList);
    }
  },
  defaultFileList: [
    {
      uid: "1",
      name: "archivo1.png",
      status: "uploading",
      url: "http://www.baidu.com/xxx.png",
      percent: 33,
    },
    {
      uid: "2",
      name: "archivo2.png",
      status: "done",
      url: "http://www.baidu.com/yyy.png",
    },
    {
      uid: "3",
      name: "archivo3.png",
      status: "error",
      response: "Server Error 500",
      // custom error message to show
      url: "http://www.baidu.com/zzz.png",
    },
  ],
};

import { SubTask } from "./SubTask";
import { CommentComponent } from "./CommentComponent";

export const TaskDrawer = ({ isOpen, task, close }) => {
  const { usuario, userToken } = useSession();

  const params = useParams();

  const timerRef = useRef();

  const [open, setOpen] = useState(isOpen);
  const [selectedTask, setSelectedTask] = useState(task);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [section, setSection] = useState("progreso");

  const [taskUrl, setTaskUrl] = useState("");
  const [taskComment, setTaskComment] = useState("");

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    setSelectedTask(task);
  }, [task]);

  const getProject = async () => {
    try {
      setLoading(true);
      const response = await clienteAxios.get(
        `/api/projects/getProjectBoard/${params.id}`
      );
      if (selectedTask) {
        const task = response.data.tasks.find(
          (task) => task.id === selectedTask.id
        );
        const updatedSelectedTask = {
          id: task.id,
          title: task.name,
          tags: task.tags.map(
            (taskTag) =>
              response.data.tags.find(
                (projectTag) => projectTag.id === taskTag.tagId
              ).name
          ),
          description: task.description,
          subTasks: task.subTasks,
          progressList: task.subTasks.filter(
            (subTask) => subTask.status == "terminado"
          ).length,
          date: format(new Date(task.due_date), "PP"),
          members: task.assignees.map(
            (assignee) =>
              response.data.team.find(
                (projectMember) => projectMember.user.id === assignee.userId
              ).user.image
          ),
          files: task.files,
          links: task.links,
          comments: task.comments.map((comment) => {
            const creator = response.data.team.find(
              (member) => member.user.id === comment.authorId
            );

            let timeAgo = "Invalid date";
            try {
              const commentDate = parseISO(comment.createdAt);
              timeAgo = formatDistanceToNow(commentDate, {
                addSuffix: true,
                locale: es,
              });
            } catch (error) {
              console.error("Error parsing comment date:", error);
            }

            return {
              id: comment.id,
              text: comment.content,
              timeAgo: timeAgo, 
              creatorId: creator.user.id,
              creatorImage: creator.user.image,
              creatorName: creator.user.name,
            };
          }),
          status: task.status,
        };
        setSelectedTask(updatedSelectedTask);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log("Error al obtener el proyecto:", error);
    }
  };


  const [messageApi, contextHolder] = message.useMessage();

  const createLink = async () => {
    try {
      const formData = new FormData();

      formData.append("authorId", usuario.id);
      formData.append("taskId", selectedTask.id);
      formData.append("link", taskUrl);

      const response = await clienteAxios.postForm(
        `/api/tasks/createLink`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      );

      getProject();

      messageApi.open({
        type: "success",
        content: "Link agregado exitosamente",
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Hubo un error al guardar el link",
      });
      console.error("Error al enviar los datos", error);
    }
  };

  const handleKeyDownLink = (e) => {
    if (e.key === "Enter") {
      createLink();
    }
  };

  const createComment = async () => {
    try {
      const formData = new FormData();

      formData.append("authorId", usuario.id);
      formData.append("taskId", selectedTask.id);
      formData.append("comment", taskComment);

      const response = await clienteAxios.postForm(
        `/api/tasks/createComment`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      );

      getProject();

      messageApi.open({
        type: "success",
        content: "Comentario agregado exitosamente",
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Hubo un error al guardar el comentario",
      });
      console.error("Error al enviar los datos", error);
    }
  };

  const handleKeyDownComment = (e) => {
    if (e.key === "Enter") {
      createComment();
    }
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const onClose = () => {
    setOpen(false);
    close()
  };

  function changeSection(newSection) {
    setSection(newSection);
  }

  useEffect(() => clearTimer, []);

  return (
    <Drawer
      title={
        selectedTask
          ? selectedTask.status == "proximo"
            ? "Próximo"
            : selectedTask.status == "en progreso"
            ? "En progreso"
            : "Terminadas"
          : ""
      }
      width={700}
      height={isMobile && "85vh"}
      placement={isMobile ? "bottom" : "right"}
      onClose={onClose}
      loading={loading}
      open={open}
      styles={{ body: { padding: "2rem", fontFamily: "Inter" } }}
      footer={
        <div
          className={`${
            section === "progreso" && "hidden"
          } m-2 flex items-center gap-3 relative`}
        >
          <img
            src={usuario.image}
            alt=""
            className="min-w-10 min-h-10 max-w-10 max-h-10 rounded-full object-cover"
          />

          {section === "archivos" ? (
            <>
              <input
                onChange={(e) => setTaskUrl(e.target.value)}
                onKeyDown={handleKeyDownLink}
                className="rounded-2xl bg-[#f0f0f0] px-3 py-2 outline-none w-full mr-4"
                type="text"
                placeholder={"Copia el link aquí"}
                name=""
                id=""
              />
              <SendOutlined className="absolute right-8" onClick={createLink} />
            </>
          ) : (
            <>
              <input
                onChange={(e) => setTaskComment(e.target.value)}
                onKeyDown={handleKeyDownComment}
                className="rounded-2xl bg-[#f0f0f0] px-3 py-2 outline-none w-full mr-4"
                type="text"
                placeholder={"Comenta aquí"}
                name=""
                id=""
              />
              <SendOutlined
                className="absolute right-8"
                onClick={createComment}
              />
            </>
          )}
        </div>
      }
    >
      {selectedTask ? (
        <>
          <p className="text-5xl font-semibold">{selectedTask.title}</p>
          <table className="w-full my-5">
            <tbody>
              <tr>
                <td className="text-[#9b9b9b] font-medium py-2 w-[7rem]">
                  Estado
                </td>
                <td className="font-medium py-2">
                  {selectedTask.status === "proximo"
                    ? "Próximo"
                    : selectedTask.status === "en progreso"
                    ? "En progreso"
                    : "Terminadas"}
                </td>
              </tr>
              <tr>
                <td className="text-[#9b9b9b] font-medium py-2">Asignados</td>
                <td className="font-medium py-2">
                  <div className="flex">
                    {selectedTask.members.map((img, index) => {
                      return (
                        <img
                          key={index}
                          src={img}
                          className={` ${
                            index === 1
                              ? " right-2"
                              : index === 2
                              ? "right-4"
                              : ""
                          } relative rounded-full min-w-[2rem] min-h-[2rem] max-w-[2rem] max-h-[2rem]`}
                        />
                      );
                    })}
                    <div className="flex items-center justify-center rounded-full w-[2rem] h-[2rem] bg-[#e6e6e6] relative right-3 cursor-pointer">
                      <FaPlus />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="text-[#9b9b9b] font-medium py-2">
                  Fecha límite
                </td>
                <td className="font-medium py-2">{selectedTask.date}</td>
              </tr>
              <tr>
                <td className="text-[#9b9b9b] font-medium py-2">Etiquetas</td>
                <td className="font-medium py-2">
                  <div className="flex gap-2 flex-wrap">
                    {selectedTask.tags.map((tag, index) => {
                      return (
                        <p
                          key={index}
                          className="bg-[#f5f5f5] text-[#959595] px-2 py-1 rounded-2xl"
                        >
                          {tag}
                        </p>
                      );
                    })}
                    <p className="border-[1px] flex items-center gap-1 text-[#000] px-2 py-1 rounded-2xl cursor-pointer">
                      {isMobile ? "Añadir" : "Añadir etiqueta"}
                      <span>
                        <FaPlus />
                      </span>
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <p className="text-2xl font-semibold">Descripción</p>
              <TbEdit size={23} opacity={0.4} className="cursor-pointer" />
            </div>
            <p className="text-[#5c5c5c]">{selectedTask.description}</p>
          </div>
          <div className="mt-10">
            <div className="flex text-[1.05rem] gap-2 lg:gap-5">
              <p
                onClick={() => {
                  changeSection("progreso");
                }}
                className={`${
                  section === "progreso"
                    ? "border-black text-black"
                    : "border-white text-gray-500 hover:text-black"
                }  px-2 lg:px-4 pb-1 border-b-[3px] hover:border-black cursor-pointer`}
              >
                Progreso
              </p>
              <p
                onClick={() => {
                  changeSection("archivos");
                }}
                className={`${
                  section === "archivos"
                    ? "border-black text-black"
                    : "border-white text-gray-500 hover:text-black"
                } px-2 lg:px-4 pb-1 border-b-[3px] hover:border-black cursor-pointer`}
              >
                Archivos
              </p>
              <div
                onClick={() => {
                  changeSection("comentarios");
                }}
                className={`${
                  section === "comentarios"
                    ? "border-black text-black"
                    : "border-white text-gray-500 hover:text-black"
                } flex items-center gap-1 px-2 lg:px-4 pb-1 border-b-[3px] hover:border-black cursor-pointer`}
              >
                <p className="">Comentarios</p>
                <div className="w-6 h-6 grid place-content-center text-white text-[.75rem] bg-black rounded-full">
                  {selectedTask.comments.length}
                </div>
              </div>
            </div>
            <hr />
            <div>
              {section === "progreso" ? (
                <div className="m-4">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-medium">Lista de progreso</p>
                    <div className="flex items-center gap-2">
                      <PiListChecks size={20} />
                      <p>
                        {selectedTask.progressList}/
                        {selectedTask.subTasks.length}
                      </p>
                    </div>
                  </div>
                  <Flex gap="small" vertical>
                    <Progress
                      percent={
                        selectedTask.subTasks.length > 0
                          ? (selectedTask.progressList /
                              selectedTask.subTasks.length) *
                            100
                          : 0
                      }
                      showInfo={false}
                      strokeColor={"black"}
                    />
                  </Flex>
                  <div className="mt-6 space-y-3">
                    {selectedTask.subTasks.map((task, index) => {
                      return (
                        <SubTask
                          key={task.id}
                          index={index}
                          taskId={task.id}
                          name={task.name}
                          isChecked={task.status == "terminado"}
                          refreshProject={getProject}
                        />
                      );
                    })}
                  </div>
                </div>
              ) : section === "archivos" ? (
                <div className="m-4">
                  <p className="text-lg font-medium mb-1">Subir archivos</p>
                  {/* <Dragger {...props} defaultFileList={[...fileList]}>
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Haz clic o arrastra el archivo a esta área para subirlo
                      </p>
                      <p className="ant-upload-hint">
                        Soporte para subida individual o en masa. Está
                        estrictamente prohibido subir datos de la empresa u
                        otros archivos prohibidos.
                      </p>
                    </Dragger> */}
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click para subir</Button>
                  </Upload>
                  <p className="text-lg font-medium mt-6">Adjuntar links</p>
                  <div className="mt-1 space-y-1">
                    <StyleSheetManager shouldForwardProp={isPropValid}>
                      {selectedTask.links.map((link) => {
                        return <Microlink url={link.url} />;
                      })}
                    </StyleSheetManager>
                  </div>
                </div>
              ) : section === "comentarios" ? (
                <div className="mt-4">
                  <p className="text-lg font-medium mt-6">Comentar</p>
                  <div className="space-y-5 mt-3">
                    {selectedTask.comments.map((comment) => {
                      return (
                        <CommentComponent
                          index={comment.id}
                          userPicture={comment.creatorImage}
                          userName={comment.creatorName}
                          timeAgo={comment.timeAgo}
                          message={comment.text}
                        />
                      );
                    })}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      ) : (
        "hi"
      )}
    </Drawer>
  );
};


