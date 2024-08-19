import React, { useState, useRef, useEffect, useContext, memo } from "react";

import { ProyectosContext } from "@/config/ProyectosContext";
import { useSession } from "@/config/useSession";

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
import { SubTask } from "@/components/(logged in)/tasks/SubTask";
import { CommentComponent } from "@/components/(logged in)/tasks/CommentComponent";

import { TaskDrawer } from "@/components/(logged in)/tasks/TaskDrawer";

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
const fileList = [
  {
    uid: "0",
    name: "archivo1.png",
    status: "done",
    percent: 33,
    url: "https://i.pinimg.com/564x/be/d9/c7/bed9c79272193572180299e91c800745.jpg",
    thumbUrl:
      "https://i.pinimg.com/564x/be/d9/c7/bed9c79272193572180299e91c800745.jpg",
  },
  {
    uid: "-1",
    name: "archivo2.png",
    status: "done",
    url: "https://i.pinimg.com/564x/be/d9/c7/bed9c79272193572180299e91c800745.jpg",
    thumbUrl:
      "https://i.pinimg.com/564x/be/d9/c7/bed9c79272193572180299e91c800745.jpg",
  },
  {
    uid: "-2",
    name: "archivo3.png",
    status: "done",
    url: "https://i.pinimg.com/564x/be/d9/c7/bed9c79272193572180299e91c800745.jpg",
    thumbUrl:
      "https://i.pinimg.com/564x/be/d9/c7/bed9c79272193572180299e91c800745.jpg",
  },
];
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

const HeaderTaskCards = memo(({ title, numCards, hidden, project, reload }) => {
  const { usuario, userToken } = useSession();

  const params = useParams();

  const [open, setOpen] = useState(false);
  const [subtasks, setSubtasks] = useState([]);
  const [treeDataMembers, setTreeDataMembers] = useState([]);

  const [valueMembers, setValueMembers] = useState([]);
  const [valueTags, setValueTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [treeDataTags, setTreeDataTags] = useState([]);

  const [titleTask, setTitleTask] = useState("");
  const [dateTask, setDateTask] = useState("");
  const [descriptionTask, setDescriptionTask] = useState("");

  useEffect(() => {
    if (project.tags) {
      setTreeDataTags(
        project.tags.map((tag) => ({ value: tag.id, title: tag.name }))
      );
    }
  }, [project]);

  const [messageApi, contextHolder] = message.useMessage();

  const handleAddNewTag = async () => {
    try {
      if (newTag == "") {
        messageApi.open({
          type: "error",
          content: "No puedes dejar la etiqueta en blanco",
        });
        return;
      }

      let tagExists = false;
      treeDataTags.map((tag) => {
        if (newTag == tag.title) {
          messageApi.open({
            type: "warning",
            content: "Esta etiqueta ya existe",
          });
          tagExists = true;
          return;
        }
      });

      if (!tagExists) {
        const formData = new FormData();

        formData.append("projectoId", project.id);
        formData.append("tag", newTag);

        setNewTag("");

        const response = await clienteAxios.postForm(
          `/api/tasks/createTag`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        );

        const newTagData = {
          title: newTag,
          value: response.data.id,
          key: response.data.id,
        };

        setTreeDataTags([...treeDataTags, newTagData]);
        setValueTags([...valueTags, newTagData.value]);

        messageApi.open({
          type: "success",
          content: "Etiqueta creada correctamente",
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Hubo un error al crear la etiqueta",
      });
      console.error("Error al enviar los datos", error);
    }
  };

  const handleNewTagChange = (e) => {
    setNewTag(e.target.value);
  };

  useEffect(() => {
    if (project != "loading") {
      setTreeDataMembers(
        project.team.map((member) => {
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
    }
  }, [project]);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const onChangeMembers = (newValue) => {
    setValueMembers(newValue);
  };

  const onChangeTags = (newValue) => {
    setValueTags(newValue);
  };

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, ""]);
  };

  const handleRemoveSubtask = (index) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks.splice(index, 1);
    setSubtasks(updatedSubtasks);
  };

  const handleSubtaskChange = (event, index) => {
    const updatedSubtasks = [...subtasks];
    const newSubtask = event.target.value.trim();
    if (newSubtask !== "") {
      updatedSubtasks[index] = newSubtask;
      setSubtasks(updatedSubtasks);
    }
  };

  const onChangeDate = (date, dateString) => {
    setDateTask(dateString);
  };

  const createTask = async () => {
    try {
      if (!titleTask.trim()) {
        messageApi.open({
          type: "error",
          content: "El título de la tarea es obligatorio",
        });
        return;
      }

      if (!dateTask) {
        messageApi.open({
          type: "error",
          content: "La fecha de entrega es obligatoria",
        });
        return;
      }

      if (valueMembers.length === 0) {
        messageApi.open({
          type: "error",
          content: "Debes seleccionar al menos un miembro",
        });
        return;
      }

      if (valueTags.length === 0) {
        messageApi.open({
          type: "error",
          content: "Debes seleccionar al menos una etiqueta",
        });
        return;
      }

      if (!descriptionTask.trim()) {
        messageApi.open({
          type: "error",
          content: "La descripción de la tarea es obligatoria",
        });
        return;
      }

      const formData = new FormData();

      const filteredSubtasks = subtasks.filter(
        (subtask) => subtask.trim() !== ""
      );
      // console.log(formData);
      if (filteredSubtasks.length > 0) {
        formData.append("subtasks", JSON.stringify(filteredSubtasks));
      }

      formData.append("projectId", params.id);
      formData.append("authorId", usuario.id);
      formData.append("title", titleTask);
      formData.append("date", dateTask);
      formData.append("members", JSON.stringify(valueMembers));
      formData.append("tags", JSON.stringify(valueTags));
      formData.append("description", descriptionTask);

      const response = await clienteAxios.postForm(
        "/api/tasks/createTask",
        formData,
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      );

      messageApi.open({
        type: "success",
        content: "Tarea creada correctamente",
      });

      reload()
      onClose()

      console.log("Respuesta del backend:", response.data);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Hubo un error al crear la tarea",
      });
      console.error("Error al enviar los datos", error);
    }
  };

  return (
    <>
      {contextHolder}
      <Drawer
        title="Crea una nueva tarea"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancelar</Button>
            <Button onClick={createTask} className="bg-black text-white">
              Crear tarea
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Título"
                rules={[
                  {
                    required: true,
                    message: "El título es obligatorio",
                  },
                ]}
              >
                <Input
                  placeholder="Ingresa el título"
                  onChange={(e) => setTitleTask(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="Fecha de entrega"
                rules={[
                  {
                    required: true,
                    message: "Por favor elige una fecha",
                  },
                ]}
              >
                <DatePicker
                  style={{
                    width: "100%",
                  }}
                  getPopupContainer={(trigger) => trigger.parentElement}
                  onChange={onChangeDate}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="members"
                label="Asignar a"
                rules={[
                  {
                    required: true,
                    message: "Seleccione al menos a 1 miembro",
                  },
                ]}
              >
                <TreeSelect
                  showSearch
                  style={{
                    width: "100%",
                  }}
                  value={valueMembers}
                  dropdownStyle={{
                    maxHeight: 400,
                    overflow: "auto",
                  }}
                  placeholder="Seleccione a los miembros"
                  allowClear
                  multiple
                  treeDefaultExpandAll
                  onChange={onChangeMembers}
                  treeData={treeDataMembers}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="tags"
                label="Etiquetas"
                rules={[
                  {
                    required: true,
                    message: "Por favor elija al menos 1 etiqueta",
                  },
                ]}
              >
                <TreeSelect
                  showSearch
                  style={{
                    width: "100%",
                  }}
                  value={valueTags}
                  dropdownStyle={{
                    maxHeight: 400,
                    overflow: "auto",
                  }}
                  placeholder="Seleccione las etiquetas"
                  allowClear
                  multiple
                  treeDefaultExpandAll
                  onChange={onChangeTags}
                  treeData={treeDataTags}
                />
                <div className="mt-3 flex gap-1">
                  <input
                    type="text"
                    value={newTag}
                    onChange={handleNewTagChange}
                    placeholder="Crear nueva etiqueta"
                    className="outline-none py-1 px-2 border-[1px] border-gray-300 rounded-md custom-placeholder"
                    style={{ placeholder: { color: "#fff" } }}
                  />

                  <Button onClick={handleAddNewTag}>Agregar</Button>
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Descripción"
                rules={[
                  {
                    required: true,
                    message: "Escribe una descripción de la tarea",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Escribe una descripción de la tarea"
                  onChange={(e) => setDescriptionTask(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Subtareas">
                {subtasks.map((subtask, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between mb-2"
                  >
                    <Input
                      value={subtask.name}
                      onChange={(event) => handleSubtaskChange(event, index)}
                      placeholder="Ingresa el nombre de la subtarea"
                      style={{ width: "90%" }}
                    />
                    <MinusCircleOutlined
                      className="cursor-pointer ml-2"
                      onClick={() => handleRemoveSubtask(index)}
                    />
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={handleAddSubtask}
                  icon={<PlusOutlined />}
                >
                  Agregar subtarea
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
      <div className="bg-[#F7F7F7] flex justify-between py-3 px-5 rounded-[1.5rem] lg:w-[80%]">
        <div>
          <p className="text-xl font-semibold">{title}</p>
          <p className="text-[#959595]">{numCards} tareas</p>
        </div>
        {hidden ?? (
          <img
            src={plusTasksIcon}
            alt="add icon"
            className="w-8 cursor-pointer"
            onClick={showDrawer}
          />
        )}
      </div>
    </>
  );
});

const ColTasks = ({ title, numCards, children, index, project, reload }) => {
  return (
    <div key={index} className="space-y-3 lg:w-[30%] lg:space-y-8">
      {title === "Próximo" ? (
        <HeaderTaskCards title={title} numCards={numCards} project={project} reload={reload}/>
      ) : (
        <HeaderTaskCards
          title={title}
          numCards={numCards}
          hidden
          project={project}
          reload={reload}
        />
      )}

      <div className="flex gap-3 overflow-auto pb-2 lg:flex-col lg:gap-6">
        {children}
      </div>
    </div>
  );
};

export const BoardTab = () => {
  const params = useParams();

  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [project, setProject] = useState("loading");
  const [upcomingTasks, setUpcomingTasks] = useState([]);

  const getProject = async () => {
    try {
      setLoading(true);
      const response = await clienteAxios.get(
        `/api/projects/getProjectBoard/${params.id}`
      );
      setProject(response.data);
      console.log(response.data.tasks)
      setUpcomingTasks(
        response.data.tasks.map((task) => {
          let progressList = 0;

          return {
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
            date: format(addDays(task.due_date, 1), 'PP', { locale: es }),
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
        })
      );
      setLoading(false);
    } catch (error) {
      console.log("Error al obtener el proyecto:", error);
    }
  };

  useEffect(() => {
    getProject();
  }, [params.id]);

  const [messageApi, contextHolder] = message.useMessage();

  const showDrawer = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  if (project == "loading" || project == undefined) return <Loader />;

  return (
    <>
      {contextHolder}
      <TaskDrawer isOpen={open} task={selectedTask} close={onClose} reload={getProject} project={project}/>
      <div className="mx-5 my-9 lg:mx-11 lg:my-16 space-y-10 lg:flex lg:space-y-0 lg:justify-around">
        <ColTasks title={"Próximo"} numCards={12} index={1} project={project} reload={getProject}>
          {upcomingTasks
            .filter((task) => task.status === "proximo")
            .map((task) => (
              <TaskCardProject
                key={task.id}
                index={task.id}
                taskData={task}
                onClick={() => showDrawer(task)}
                mobile
              />
            ))}
        </ColTasks>

        <ColTasks
          title={"En proceso"}
          numCards={12}
          index={2}
          project={project}
          reload={getProject}
        >
          {upcomingTasks
            .filter((task) => task.status === "en progreso")
            .map((task) => (
              <TaskCardProject
                key={task.id}
                index={task.id}
                taskData={task}
                onClick={() => showDrawer(task)}
                mobile
              />
            ))}
        </ColTasks>

        <ColTasks
          title={"Terminadas"}
          numCards={12}
          index={3}
          project={project}
          reload={getProject}
        >
          {upcomingTasks
            .filter((task) => task.status === "terminado")
            .map((task) => (
              <TaskCardProject
                key={task.id}
                index={task.id}
                taskData={task}
                onClick={() => showDrawer(task)}
                mobile
              />
            ))}
        </ColTasks>
      </div>
    </>
  );
};
