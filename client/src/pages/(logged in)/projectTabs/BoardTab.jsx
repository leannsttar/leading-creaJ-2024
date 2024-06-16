import { useState, useRef, useEffect, useContext } from "react";

import { ProyectosContext } from "@/config/ProyectosContext";
import { useSession } from "@/config/useSession";

import { Loader } from "@/components/Loader";

import "../../../index.css";

import { useParams } from "react-router-dom";

import { format } from "date-fns";

import { clienteAxios } from "@/config/clienteAxios";

import { FaPlus } from "react-icons/fa6";
import { TbEdit } from "react-icons/tb";
import { PiListChecks } from "react-icons/pi";
import { PiList } from "react-icons/pi";

import { TaskCardProject } from "@/components/(logged in)/TaskCardProject";

import plusTasksIcon from "../../../assets/plusTasksIcon.svg";
import avatar from "../../../assets/Avatar.jpg";

import Microlink from "@microlink/react";

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

const HeaderTaskCards = ({ title, numCards, hidden, project }) => {
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

        console.log(response);

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
                  src={`http://localhost:5000/${member.user.image}`}
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

  // if (project != "loading") {
  //   console.log(treeDataMembers);
  // }

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
    // console.log(date, dateString);
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

      console.log("title", titleTask);
      console.log("date", dateTask);
      console.log("members", valueMembers);
      console.log("tags", valueTags);
      console.log("description", descriptionTask);
      console.log("subtasks", subtasks);

      const formData = new FormData();

      const filteredSubtasks = subtasks.filter(
        (subtask) => subtask.trim() !== ""
      );
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

      console.log(response);

      // const formDataTasksAssignees = new FormData();

      // valueMembers.map((member) => {
      //   formDataTasksAssignees.append("assigneeId", member.id);
      // })

      messageApi.open({
        type: "success",
        content: "Tarea creada correctamente",
      });

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
};

const ColTasks = ({ title, numCards, children, index, project }) => {
  return (
    <div key={index} className="space-y-3 lg:w-[30%] lg:space-y-8">
      {title === "Próximo" ? (
        <HeaderTaskCards title={title} numCards={numCards} project={project} />
      ) : (
        <HeaderTaskCards
          title={title}
          numCards={numCards}
          hidden
          project={project}
        />
      )}

      <div className="flex gap-3 overflow-auto pb-2 lg:flex-col lg:gap-6">
        {children}
      </div>
    </div>
  );
};

const SubTask = ({ name, index }) => {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div key={index} className="flex items-center gap-2 w-full">
      <PiList size={22} className="pb-2" />
      <Checkbox
        onChange={onChange}
        className="text-[1rem] pb-2 border-b-[1px] border-gray-300 w-full mr-6"
      >
        {name}
      </Checkbox>
    </div>
  );
};

const CommentComponent = ({ userName, userPicture, message, timeAgo }) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-3">
        <img
          src={userPicture}
          alt=""
          className="min-h-8 min-w-8 max-h-8 max-w-8 rounded-full object-cover"
        />
        <div className="flex items-center gap-1">
          <p className="font-medium">{userName}</p>
          <div className="rounded-full bg-gray-600 w-1 h-1"></div>
          <p className="text-[.8rem] text-gray-500">{timeAgo}</p>
        </div>
      </div>
      <p>{message}</p>
      <hr />
    </div>
  );
};

export const BoardTab = () => {
  const params = useParams();

  const timerRef = useRef();

  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [section, setSection] = useState("progreso");

  const [project, setProject] = useState("loading");

  const [upcomingTasks, setUpcomingTasks] = useState([]);

  const getProject = async () => {
    try {
      const response = await clienteAxios.get(
        `/api/projects/getProjectBoard/${params.id}`
      );
      console.log(response.data);
      setProject(response.data);
      setUpcomingTasks(
        response.data.tasks.map((task) => {
          return {
            id: task.id,
            title: task.name,
            tags: task.tags.map(
              (taskTag) =>
                response.data.tags.find(
                  (projectTag) => projectTag.id === taskTag.tagId
                ).name
            ),
            description: task.description,
            subTasks: task.subTasks.map((subtask) => subtask.name),
            date: format(new Date(task.due_date), "PP"),
            members: task.assignees.map(
              (assignee) =>
                response.data.team.find(
                  (projectMember) => projectMember.user.id === assignee.userId
                ).user.image
            ),
            files: task.files.length,
            comments: task.comments,
            status: task.status,
          };
        })
      );
    } catch (error) {
      console.log("Error al obtener el proyecto:", error);
    }
  };

  useEffect(() => {
    getProject();
  }, [params.id]);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const showDrawer = (task) => {
    setSelectedTask(task);
    setOpen(true);
    setLoading(true);
    timerRef.current = setTimeout(() => {
      setLoading(false);
    }, 600);
  };

  const onClose = () => {
    setOpen(false);
  };

  const changeSection = (newSection) => {
    setSection(newSection);
  };

  useEffect(() => clearTimer, []);

  // const handleSubmit = (values) => {
  //   console.log("Received values:", values);

  // };

  if (project == "loading" || project == undefined) return <Loader screen />;

  return (
    <>
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
              src={avatar}
              alt=""
              className="min-w-10 min-h-10 max-w-10 max-h-10 rounded-full object-cover"
            />
            <input
              className="rounded-2xl bg-[#f7f7f7] px-3 py-2 outline-none w-full mr-4"
              type="text"
              placeholder={
                section === "archivos"
                  ? "Copia el link aquí ..."
                  : section === "comentarios"
                  ? "Comenta aquí ..."
                  : ""
              }
              name=""
              id=""
            />
            <SendOutlined className="absolute right-8" />
          </div>
        }
      >
        {selectedTask && (
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
                            src={`http://localhost:5000/${img}`}
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
                      ? "border-blue-500 font-medium"
                      : "border-white"
                  } px-2 lg:px-4 pb-1 border-b-[3px]  hover:border-blue-500 cursor-pointer`}
                >
                  Progreso
                </p>
                <p
                  onClick={() => {
                    changeSection("archivos");
                  }}
                  className={`${
                    section === "archivos"
                      ? "border-blue-500 font-medium"
                      : "border-white"
                  } px-2 lg:px-4 pb-1 border-b-[3px] border-white hover:border-blue-500 cursor-pointer`}
                >
                  Archivos
                </p>
                <div
                  onClick={() => {
                    changeSection("comentarios");
                  }}
                  className={`${
                    section === "comentarios"
                      ? "border-blue-500 font-medium"
                      : "border-white"
                  } flex items-center gap-1 px-2 lg:px-4 pb-1 border-b-[3px] border-white hover:border-blue-500 cursor-pointer`}
                >
                  <p className="">Comentarios</p>
                  <div className="w-6 h-6 grid place-content-center text-white text-[.75rem] bg-blue-500 rounded-full">
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
                        <p>3/4</p>
                      </div>
                    </div>
                    <Flex gap="small" vertical>
                      <Progress percent={75} showInfo={false} />
                    </Flex>
                    <div className="mt-6 space-y-3">
                      {selectedTask.subTasks.map((task, index) => {
                        return <SubTask name={task} index={index} />;
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
                      <Microlink url="https://www.figma.com/design/MQs0tlEU38XBzoq4COQa6I/Creaj?node-id=25%3A623&t=ZbGb0NlJWaQJdxUR-1" />
                      <Microlink url="https://mockapi.io/projects/6643d55c6c6a656587087600" />
                    </div>
                  </div>
                ) : section === "comentarios" ? (
                  <div className="mt-4">
                    <p className="text-lg font-medium mt-6">Comentar</p>
                    <div className="space-y-5 mt-3">
                      <CommentComponent
                        userPicture={
                          "https://i.pinimg.com/564x/68/45/5d/68455dc2b7f16699bc422ac3ce3f684f.jpg"
                        }
                        userName={"Ji Chang-wook"}
                        timeAgo={"2m ago"}
                        message={
                          "Hi @Liz! I checked the results, there are some comments in figma, can you check it now, thanks."
                        }
                      />
                      <CommentComponent
                        userPicture={
                          "https://i.pinimg.com/564x/68/45/5d/68455dc2b7f16699bc422ac3ce3f684f.jpg"
                        }
                        userName={"Ji Chang-wook"}
                        timeAgo={"2m ago"}
                        message={
                          "Hi @Liz! I checked the results, there are some comments in figma, can you check it now, thanks."
                        }
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </>
        )}
      </Drawer>
      <div className="mx-5 my-9 lg:mx-11 lg:my-16 space-y-10 lg:flex lg:space-y-0 lg:justify-around">
        <ColTasks title={"Próximo"} numCards={12} index={1} project={project}>
          {upcomingTasks.map((task, index) => (
            <TaskCardProject
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
        >
          {upcomingTasks.map((task, index) => (
            <TaskCardProject
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
        >
          {upcomingTasks.map((task, index) => (
            <TaskCardProject
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
