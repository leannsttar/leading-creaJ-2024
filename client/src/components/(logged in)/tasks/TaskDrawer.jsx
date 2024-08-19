import React, { useState, useRef, useEffect, useContext, memo } from "react";

import { ProyectosContext } from "@/config/ProyectosContext";
import { useSession } from "@/config/useSession";

import { FiEdit } from "react-icons/fi";

import { Loader } from "@/components/Loader";

import "../../../index.css";

import { useParams } from "react-router-dom";

import { format, formatDistanceToNow, parseISO, addDays } from "date-fns";
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

export const TaskDrawer = ({ isOpen, task, close, project, reload, overview }) => {
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

  const [treeDataMembers, setTreeDataMembers] = useState([]);
  const [valueMembers, setValueMembers] = useState([]);

  const [treeDataTags, setTreeDataTags] = useState([]);
  const [valueTags, setValueTags] = useState([]);

  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");

  const [editingMembers, setEditingMembers] = useState(false);
  const [editingTags, setEditingTags] = useState(false);

  const [editingTitle, setEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");

  const [editingDate, setEditingDate] = useState(false);
  const [editedDate, setEditedDate] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const [canEdit, setCanEdit] = useState(false);

  const onChangeDate = (date, dateString) => {
    setEditedDate(dateString);
  };

  useEffect(() => {
    setOpen(isOpen);
    if (task) {
      setSelectedTask(task);
      setTreeDataMembers(
        project.team
          .filter(
            (member) =>
              !task.members.some((assignee) => assignee.id === member.user.id)
          )
          .map((member) => {
            return {
              value: member.user.id,
              title: (
                <div className="flex items-center gap-2">
                  <img
                    src={member.user.image}
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <p>{member.user.name}</p>
                </div>
              ),
            };
          })
      );
      setEditedTitle(task.title);
      setEditedDescription(task.description);
      if (project.tags) {
        setTreeDataTags(
          project.tags
            .filter((tag) => !task.tags.includes(tag.name))
            .map((tag) => ({ value: tag.id, title: tag.name }))
        );
      }
    }
  }, [isOpen, task]);

  useEffect(() => {
    if (project && selectedTask && usuario) {
      const isProjectLeader = project.team.some(
        (member) => member.role === "leader" && member.user.id === usuario.id
      );
      console.log(selectedTask.members)
      const isTaskCreator = selectedTask.creator.id === usuario.id;
      setCanEdit(isProjectLeader || isTaskCreator);
    }
  }, [project, selectedTask, usuario]);

  const getProject = async () => {
    try {
      setLoading(true);
      
      const response = await clienteAxios.get(
        `/api/projects/${overview ? 'getProjectOverview' : 'getProjectBoard'}/${params.id}`
      );
      if (selectedTask) {
        const task = response.data.tasks.find(
          (task) => task.id === selectedTask.id
        );
        const updatedSelectedTask = {
          id: task.id,
          title: task.name,
          creator: task.creator,
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
          date: format(addDays(task.due_date, 1), "PP", { locale: es }),
          members: task.assignees.map((assignee) => {
            const member = response.data.team.find(
              (projectMember) => projectMember.user.id === assignee.userId
            ).user;
            return {
              id: member.id,
              name: member.name,
              image: member.image,
            };
          }),
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
        reload();
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log("Error al obtener el proyecto:", error);
    }
  };

  const [messageApi, contextHolder] = message.useMessage();

  const handleSave = async () => {
    try {
      if (!canEdit) {
        messageApi.error("No tienes permiso para editar esta tarea");
        return;
      }

      const formData = new FormData();
      let hasChanges = false;

      if (editingTitle) {
        if (!editedTitle.trim()) {
          messageApi.error("El título de la tarea no puede estar vacío");
          return;
        }
        formData.append("title", editedTitle);
        hasChanges = true;
      }

      if (editingDate) {
        if (!editedDate) {
          messageApi.error("La fecha de entrega es obligatoria");
          return;
        }
        // console.log(editedDate)
        formData.append("date", editedDate);
        hasChanges = true;
      }

      if (editingMembers) {
        if (valueMembers.length === 0) {
          messageApi.error("Debes seleccionar al menos un miembro");
          return;
        }
        formData.append("members", JSON.stringify(valueMembers));
        hasChanges = true;
      }

      if (editingTags) {
        if (valueTags.length === 0) {
          messageApi.error("Debes seleccionar al menos una etiqueta");
          return;
        }
        formData.append("tags", JSON.stringify(valueTags));
        hasChanges = true;
      }

      if (isEditingDescription) {
        if (!editedDescription.trim()) {
          messageApi.error("La descripción de la tarea no puede estar vacía");
          return;
        }
        formData.append("description", editedDescription);
        hasChanges = true;
      }

      if (!hasChanges) {
        messageApi.info("No se han realizado cambios");
        return;
      }

      formData.append("projectId", project.id)
      formData.append("userId", usuario.id)
      formData.append("taskId", selectedTask.id);
      formData.append("actionUserName", usuario.name)
      formData.append("taskName", selectedTask.title)
      formData.append("assignedUsers", JSON.stringify(selectedTask.members))

      const response = await clienteAxios.postForm(
        "/api/tasks/updateTask",
        formData,
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      );

      messageApi.success("Tarea actualizada correctamente");
      getProject();

      // Resetear estados de edición
      setEditingMembers(false);
      setEditingTags(false);
      setIsEditingDescription(false);
      setEditingDate(false);
      setEditingTitle(false);
      setIsEditing(false);
    } catch (error) {
      messageApi.error("Hubo un error al actualizar la tarea");
      console.error("Error al enviar los datos", error);
    }
  };

  useEffect(() => {
    setIsEditing(
      editingMembers ||
        editingTags ||
        isEditingDescription ||
        editingDate ||
        editingTitle
    );
  }, [
    editingMembers,
    editingTags,
    isEditingDescription,
    editingDate,
    editingTitle,
  ]);

  const cancelEditing = () => {
    setEditingMembers(false);
    setEditingTags(false);
    setEditingDate(false);
    setEditingTitle(false);
    setIsEditingDescription(false);
    setIsEditing(false);
  };

  const onChangeMembers = (newValue) => {
    setValueMembers(newValue);
  };

  const onChangeTags = (newValue) => {
    setValueTags(newValue);
  };
  // const handleEditDescription = async () => {
  //   if (editedDescription !== selectedTask.description) {
  //     try {
  //       const formData = new FormData();
  //       formData.append("taskId", selectedTask.id);
  //       formData.append("description", editedDescription);

  //       await clienteAxios.postForm("/api/tasks/updateTask", formData, {
  //         headers: { Authorization: "Bearer " + userToken },
  //       });

  //       getProject();
  //       setIsEditingDescription(false);
  //       messageApi.success("Descripción actualizada exitosamente");
  //     } catch (error) {
  //       console.error("Error al actualizar descripción:", error);
  //       messageApi.error("Error al actualizar descripción");
  //     }
  //   }
  // };

  const createLink = async () => {
    try {
      const formData = new FormData();

      formData.append("projectId", project.id)
      formData.append("authorId", usuario.id);
      formData.append("taskId", selectedTask.id);
      formData.append("link", taskUrl);
      formData.append("authorName", usuario.name)
      formData.append("taskName", selectedTask.title)
      formData.append("assignedUsers", JSON.stringify(selectedTask.members))

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
      
      formData.append("projectId", project.id)
      formData.append("authorName", usuario.name)
      formData.append("taskName", selectedTask.title)
      formData.append("assignedUsers", JSON.stringify(selectedTask.members))
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

  const taskToInProgress = async (taskId) => {
    try {
      const formData = new FormData();
      formData.append("projectId", project.id)
      formData.append("userId", usuario.id)
      formData.append("taskId", taskId);
      formData.append("status", "en progreso");
      formData.append("actionUserName", usuario.name)
      formData.append("taskName", selectedTask.title)
      formData.append("assignedUsers", JSON.stringify(selectedTask.members))

      const response = await clienteAxios.postForm(
        `/api/tasks/changeTaskStatus`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      );

      getProject();
      return true;
    } catch (error) {
      console.error("Error al cambiar el estado de la tarea:", error);
      return false;
    }
  };

  const handleTaskToInProgress = async () => {
    if (selectedTask) {
      const success = await taskToInProgress(selectedTask.id);
      if (success) {
        messageApi.open({
          type: "success",
          content: "Tarea iniciada correctamente",
        });
      } else {
        messageApi.open({
          type: "error",
          content: "Hubo un error al iniciar la tarea",
        });
      }
    }
  };

  const taskToFinished = async (taskId) => {
    try {
      const formData = new FormData();

      formData.append("projectId", project.id)
      formData.append("userId", usuario.id)
      formData.append("taskId", taskId);
      formData.append("status", "terminado");
      formData.append("actionUserName", usuario.name)
      formData.append("taskName", selectedTask.title)
      formData.append("assignedUsers", JSON.stringify(selectedTask.members))

      const response = await clienteAxios.postForm(
        `/api/tasks/changeTaskStatus`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      );

      getProject();

      // Retornamos true para indicar éxito
      return true;
    } catch (error) {
      console.error("Error al enviar los datos", error);
      // Retornamos false para indicar fallo
      return false;
    }
  };

  const handleTaskToFinished = async () => {
    if (selectedTask) {
      const success = await taskToFinished(selectedTask.id);
      if (success) {
        messageApi.open({
          type: "success",
          content: "Tarea marcada como finalizada",
        });
      } else {
        messageApi.open({
          type: "error",
          content: "Hubo un error al marcar la tarea como finalizada",
        });
      }
    }
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const onClose = () => {
    setOpen(false);
    setEditingMembers(false);
    setEditingTags(false);
    setIsEditingDescription(false);
    setIsEditing(false);
    close();
  };

  function changeSection(newSection) {
    setSection(newSection);
  }

  useEffect(() => clearTimer, []);
  console.log(selectedTask);
  return (
    <>
      {contextHolder}

      <Drawer
        title={
          <div className="flex justify-between items-center">
            <span>
              {selectedTask
                ? selectedTask.status == "proximo"
                  ? "Próximo"
                  : selectedTask.status == "en progreso"
                  ? "En progreso"
                  : "Terminadas"
                : ""}
            </span>

            {isEditing && (
              <div className="flex gap-2">
                <Button className="bg-black text-white" onClick={cancelEditing}>
                  Cancelar
                </Button>
                <Button onClick={handleSave}>Guardar</Button>
              </div>
            )}
          </div>
        }
        width={700}
        height={isMobile && "85vh"}
        placement={isMobile ? "bottom" : "right"}
        onClose={onClose}
        loading={loading}
        open={open}
        styles={{ body: { padding: "2rem", fontFamily: "Inter" } }}
        footer={
          <div className={`m-2 flex items-center gap-3 relative`}>
            <img
              src={usuario.image}
              alt=""
              className="min-w-10 min-h-10 max-w-10 max-h-10 rounded-full object-cover"
            />
        
            {selectedTask ? (
              <>
                {section === "comentarios" ? (
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
                ) : selectedTask.status === "terminado" ? (
                  <p className="text-green-600 font-semibold ml-2">
                    ✓ Esta tarea ya está completada
                  </p>
                ) : selectedTask.members.some((member) => member.id === usuario.id) ? (
                  <>
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
                        <SendOutlined
                          className="absolute right-8"
                          onClick={createLink}
                        />
                      </>
                    ) : (
                      <>
                        {selectedTask.status === "proximo" ? (
                          <button
                            onClick={handleTaskToInProgress}
                            className="text-white font-semibold bg-[#000] hover:bg-[#097969] rounded-lg px-3 py-2"
                          >
                            Empezar tarea
                          </button>
                        ) : selectedTask.status === "en progreso" ? (
                          <button
                            onClick={handleTaskToFinished}
                            className="text-white font-semibold bg-[#000] hover:bg-[#097969] rounded-lg px-3 py-2"
                          >
                            Marcar tarea como completada
                          </button>
                        ) : null}
                      </>
                    )}
                  </>
                ) : canEdit ? (
                  <p className="text-gray-600 font-semibold ml-2">
                    No estás asignado a esta tarea
                  </p>
                ) : (
                  <p className="text-gray-600 font-semibold ml-2">
                    No estás asignado a esta tarea y no tienes permiso para editarla
                  </p>
                )}
              </>
            ) : null}
          </div>
        }
      >
        {selectedTask ? (
          <>
            <div className="flex gap-1 items-center">
              {editingTitle && canEdit ? (
                <input
                  className="outline-none border-[1px] border-gray-400 rounded-lg py-1 px-3 text-4xl font-bold"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              ) : (
                <p className="text-5xl font-semibold">{selectedTask.title}</p>
              )}
              {canEdit && (
                <TbEdit
                  size={30}
                  opacity={0.6}
                  className="cursor-pointer relative top-0.5"
                  onClick={() => setEditingTitle(true)}
                />
              )}
            </div>
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
                  <td className="font-medium py-2 ">
                    <div className="flex">
                      {selectedTask.members.map((member, index) => {
                        return (
                          <img
                            key={index}
                            src={member.image}
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

                      {canEdit && editingMembers ? (
                        <div className="flex min-w-[9rem] items-center justify-center rounded-full ml-3 cursor-pointer">
                          <TreeSelect
                            showSearch
                            style={{ width: "100%" }}
                            value={valueMembers}
                            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                            placeholder="Añadir miembro"
                            allowClear
                            multiple
                            treeDefaultExpandAll
                            onChange={onChangeMembers}
                            treeData={treeDataMembers}
                          />
                        </div>
                      ) : canEdit ? (
                        <div
                          className="w-8 h-8 ml-2 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
                          onClick={() => setEditingMembers(true)}
                        >
                          <FaPlus className="text-gray-500" />
                        </div>
                      ) : null}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="text-[#9b9b9b] font-medium py-2">
                    Fecha límite
                  </td>
                  <td className=" py-2 flex items-center gap-2">
                    <p className="font-medium">{selectedTask.date}</p>
                    {canEdit && editingDate ? (
                      <div className="flex min-w-[9rem] items-center justify-center rounded-full ml-3 cursor-pointer">
                        <DatePicker
                          style={{
                            width: "100%",
                          }}
                          getPopupContainer={(trigger) => trigger.parentElement}
                          onChange={onChangeDate}
                          placeholder={"Selecciona fecha"}
                        />
                      </div>
                    ) : canEdit ? (
                      <div
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
                        onClick={() => setEditingDate(true)}
                      >
                        <FiEdit opacity={0.7} />
                      </div>
                    ) : null}
                  </td>
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

                      {canEdit && editingTags ? (
                        <div className="flex min-w-[9rem] items-center justify-center rounded-full cursor-pointer">
                          <TreeSelect
                            showSearch
                            style={{ width: "100%" }}
                            value={valueTags}
                            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                            placeholder="Añadir etiqueta"
                            allowClear
                            multiple
                            treeDefaultExpandAll
                            onChange={onChangeTags}
                            treeData={treeDataTags}
                          />
                        </div>
                      ) : canEdit ? (
                        <div
                          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
                          onClick={() => setEditingTags(true)}
                        >
                          <FaPlus className="text-gray-500" />
                        </div>
                      ) : null}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="text-[#9b9b9b] font-medium py-2">Creador</td>
                  <td className="font-medium py-2">
                    <div className="flex gap-1.5 flex-wrap items-center">
                      <img
                        src={selectedTask.creator.image}
                        className={`relative rounded-full min-w-[1.5rem] min-h-[1.5rem] max-w-[1.5rem] max-h-[1.5rem]`}
                      />
                      <p>{selectedTask.creator.name}</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <p className="text-2xl font-semibold">Descripción</p>
                {canEdit &&
                  (isEditingDescription ? (
                    <Button onClick={handleSave}>Guardar</Button>
                  ) : (
                    <TbEdit
                      size={23}
                      opacity={0.4}
                      className="cursor-pointer"
                      onClick={() => setIsEditingDescription(true)}
                    />
                  ))}
              </div>
              {isEditingDescription && canEdit ? (
                <Input.TextArea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              ) : (
                <p className="text-[#5c5c5c]">{selectedTask.description}</p>
              )}
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
                            taskMembers={selectedTask.members}
                            taskName={selectedTask.title}
                            projectId={project.id}
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
                      <Button icon={<UploadOutlined />}>
                        Click para subir
                      </Button>
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
    </>
  );
};
