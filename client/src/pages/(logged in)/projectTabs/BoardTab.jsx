import { useState, useRef, useEffect } from "react";
import Link from "antd/es/typography/Link";
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
} from "antd";
const { Option } = Select;

import { InboxOutlined, MinusCircleOutlined, PlusOutlined,  SendOutlined, UploadOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
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

const treeDataTags = [
  {
    value: "research",
    title: "Research",
  },
  {
    value: "ux",
    title: "UX",
  },
  {
    value: "ui",
    title: "UI",
  },
  {
    value: "design system",
    title: "Design System",
  },
];

const treeDataMembers = [
  {
    value: "member1",
    title: (
      <div className="flex items-center gap-1">
        <img src="https://i.pinimg.com/564x/1d/74/78/1d7478575d3660265b0163630aff82ff.jpg" className="w-4 h-4 rounded-full object-cover"/>
        <p>miembro 1</p>
      </div>
    ),
  },
  {
    value: "member2",
    title: (
      <div className="flex items-center gap-1">
        <img src="https://i.pinimg.com/564x/bf/1b/15/bf1b150ed20b1071a77c192a7d6a98ef.jpg" className="w-4 h-4 rounded-full object-cover"/>
        <p>miembro 2</p>
      </div>
    ),
  },
  {
    value: "member3",
    title: (
      <div className="flex items-center gap-1">
        <img src="https://i.pinimg.com/564x/bd/3c/61/bd3c61b844be21ce958a5d5413c991a9.jpg" className="w-4 h-4 rounded-full object-cover"/>
        <p>miembro 3</p>
      </div>
    ),
  },
  {
    value: "member4",
    title: (
      <div className="flex items-center gap-1">
        <img src="https://i.pinimg.com/564x/d4/9c/ff/d49cffc63e34c2ecb55a31a01067aa7c.jpg" className="w-4 h-4 rounded-full object-cover"/>
        <p>miembro 4</p>
      </div>
    ),
  },
];

const HeaderTaskCards = ({ title, numCards, hidden }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [subtasks, setSubtasks] = useState([]); 

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const onChange = (newValue) => {
    setValue(newValue);
  };

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { name: '', completed: false }]); // Add empty subtask
  };

  const handleRemoveSubtask = (index) => {
    const updatedSubtasks = [...subtasks]; // Create a copy to avoid mutation
    updatedSubtasks.splice(index, 1); // Remove subtask at the specified index
    setSubtasks(updatedSubtasks);
  };

  const handleSubtaskChange = (event, index) => {
    const updatedSubtasks = [...subtasks]; // Create a copy to avoid mutation
    updatedSubtasks[index].name = event.target.value; // Update the name of the subtask
    setSubtasks(updatedSubtasks);
  };

  return (
    <>
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
            <Button onClick={onClose} className="bg-black text-white">
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
                <Input placeholder="Ingresa el título" />
              </Form.Item>
            </Col>
            {/* <Col span={12}>
              <Form.Item
                name="url"
                label="Url"
                rules={[
                  {
                    required: true,
                    message: "Please enter url",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                  addonBefore="http://"
                  addonAfter=".com"
                  placeholder="Please enter url"
                />
              </Form.Item>
            </Col> */}
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
                  value={value}
                  dropdownStyle={{
                    maxHeight: 400,
                    overflow: "auto",
                  }}
                  placeholder="Seleccione a los miembros"
                  allowClear
                  multiple
                  treeDefaultExpandAll
                  onChange={onChange}
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
                  value={value}
                  dropdownStyle={{
                    maxHeight: 400,
                    overflow: "auto",
                  }}
                  placeholder="Seleccione las etiquetas"
                  allowClear
                  multiple
                  treeDefaultExpandAll
                  onChange={onChange}
                  treeData={treeDataTags}
                />
              </Form.Item>
            </Col>
          </Row>
          {/* <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="approver"
                label="Approver"
                rules={[
                  {
                    required: true,
                    message: "Please choose the approver",
                  },
                ]}
              >
                <Select placeholder="Please choose the approver">
                  <Option value="jack">Jack Ma</Option>
                  <Option value="tom">Tom Liu</Option>
                </Select>
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
                />
              </Form.Item>
            </Col>
          </Row> */}
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
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Subtareas">
                {subtasks.map((subtask, index) => (
                  <div key={index} className="flex items-center justify-between mb-2">
                    <Input
                      value={subtask.name}
                      onChange={(event) => handleSubtaskChange(event, index)}
                      placeholder="Ingresa el nombre de la subtarea"
                      style={{ width: '90%' }}
                    />
                    <MinusCircleOutlined
                      className="cursor-pointer ml-2"
                      onClick={() => handleRemoveSubtask(index)}
                    />
                  </div>
                ))}
                <Button type="dashed" onClick={handleAddSubtask} icon={<PlusOutlined />}>
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
        {hidden ?? <img
          src={plusTasksIcon}
          alt="add icon"
          className="w-8 cursor-pointer"
          onClick={showDrawer}
        />}
      </div>
    </>
  );
};

const ColTasks = ({ title, numCards, children, index }) => {
  return (
    <div key={index} className="space-y-3 lg:w-[30%] lg:space-y-8">
      {title === "Próximo" ? <HeaderTaskCards title={title} numCards={numCards} /> : <HeaderTaskCards title={title} numCards={numCards} hidden/> }
      
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
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [section, setSection] = useState("progreso");
  const timerRef = useRef();

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

  const [data, setData] = useState([
    {
      id: 1,
      title: "Create component button web",
      tags: ["Design System", "UI"],
      description:
        "On the main page there are several banners displayed. The latest main products are displayed at the top. The need for a call to action must also be considered when it is on the top web banner. Don't forget to enter the categories too",
      subTasks: [
        "Medium button",
        "Small button",
        "Hover button",
        "Ghost button",
      ],
      date: "Nov 16, 2022",
      files: 3,
      members: [
        "https://i.pinimg.com/564x/5e/d9/15/5ed91505500b45218ba337b64d289ce2.jpg",
        "https://i.pinimg.com/564x/ef/eb/d5/efebd5b0417315939af60c242c9c32cc.jpg",
        "https://i.pinimg.com/564x/b5/e8/e9/b5e8e9c436fb3d3b08c9a333c8d5c48e.jpg",
      ],
      comments: 0,
      status: "inProgress",
    },
    {
      id: 2,
      title: "Payment method via e-commerce",
      tags: ["Research", "UX"],
      description:
        "On the main page there are several banners displayed. The latest main products are displayed at the top. The need for a call to action must also be considered when it is on the top web banner. Don't forget to enter the categories too",
      subTasks: [
        "Medium button",
        "Small button",
        "Hover button",
        "Ghost button",
      ],
      date: "Nov 18",
      files: 3,
      members: [
        "https://i.pinimg.com/564x/5e/d9/15/5ed91505500b45218ba337b64d289ce2.jpg",
        "https://i.pinimg.com/564x/ef/eb/d5/efebd5b0417315939af60c242c9c32cc.jpg",
        "https://i.pinimg.com/564x/b5/e8/e9/b5e8e9c436fb3d3b08c9a333c8d5c48e.jpg",
      ],
      comments: 0,
      status: "done",
    },
    {
      id: 3,
      title: "Create home ux writing content",
      tags: ["UX Writer", "UX"],
      description:
        "On the main page there are several banners displayed. The latest main products are displayed at the top. The need for a call to action must also be considered when it is on the top web banner. Don't forget to enter the categories too",
      subTasks: [
        "Medium button",
        "Small button",
        "Hover button",
        "Ghost button",
      ],
      date: "Nov 17",
      files: 3,
      members: [
        "https://i.pinimg.com/564x/5e/d9/15/5ed91505500b45218ba337b64d289ce2.jpg",
        "https://i.pinimg.com/564x/ef/eb/d5/efebd5b0417315939af60c242c9c32cc.jpg",
        "https://i.pinimg.com/564x/b5/e8/e9/b5e8e9c436fb3d3b08c9a333c8d5c48e.jpg",
      ],
      comments: 0,
      status: "upcoming",
    },
  ]);

  const [data2, setData2] = useState([
    {
      id: 4,
      title: "Create component button web",
      tags: ["Design System", "UI"],
      description:
        "On the main page there are several banners displayed. The latest main products are displayed at the top. The need for a call to action must also be considered when it is on the top web banner. Don't forget to enter the categories too",
      subTasks: [
        "Medium button",
        "Small button",
        "Hover button",
        "Ghost button",
      ],
      date: "Nov 16, 2022",
      files: 3,
      members: [
        "https://i.pinimg.com/564x/5e/d9/15/5ed91505500b45218ba337b64d289ce2.jpg",
        "https://i.pinimg.com/564x/ef/eb/d5/efebd5b0417315939af60c242c9c32cc.jpg",
        "https://i.pinimg.com/564x/b5/e8/e9/b5e8e9c436fb3d3b08c9a333c8d5c48e.jpg",
      ],
      comments: 0,
      status: "inProgress",
    },
    {
      id: 5,
      title: "Payment method via e-commerce",
      tags: ["Research", "UX"],
      description:
        "On the main page there are several banners displayed. The latest main products are displayed at the top. The need for a call to action must also be considered when it is on the top web banner. Don't forget to enter the categories too",
      subTasks: [
        "Medium button",
        "Small button",
        "Hover button",
        "Ghost button",
      ],
      date: "Nov 18",
      files: 3,
      members: [
        "https://i.pinimg.com/564x/5e/d9/15/5ed91505500b45218ba337b64d289ce2.jpg",
        "https://i.pinimg.com/564x/ef/eb/d5/efebd5b0417315939af60c242c9c32cc.jpg",
        "https://i.pinimg.com/564x/b5/e8/e9/b5e8e9c436fb3d3b08c9a333c8d5c48e.jpg",
      ],
      comments: 0,
      status: "done",
    },
    {
      id: 6,
      title: "Create home ux writing content",
      tags: ["UX Writer", "UX"],
      description:
        "On the main page there are several banners displayed. The latest main products are displayed at the top. The need for a call to action must also be considered when it is on the top web banner. Don't forget to enter the categories too",
      subTasks: [
        "Medium button",
        "Small button",
        "Hover button",
        "Ghost button",
      ],
      date: "Nov 17",
      files: 3,
      members: [
        "https://i.pinimg.com/564x/5e/d9/15/5ed91505500b45218ba337b64d289ce2.jpg",
        "https://i.pinimg.com/564x/ef/eb/d5/efebd5b0417315939af60c242c9c32cc.jpg",
        "https://i.pinimg.com/564x/b5/e8/e9/b5e8e9c436fb3d3b08c9a333c8d5c48e.jpg",
      ],
      comments: 0,
      status: "upcoming",
    },
  ]);

  const [data3, setData3] = useState([
    {
      id: 7,
      title: "Create component button web",
      tags: ["Design System", "UI"],
      description:
        "On the main page there are several banners displayed. The latest main products are displayed at the top. The need for a call to action must also be considered when it is on the top web banner. Don't forget to enter the categories too",
      subTasks: [
        "Medium button",
        "Small button",
        "Hover button",
        "Ghost button",
      ],
      date: "Nov 16, 2022",
      files: 3,
      members: [
        "https://i.pinimg.com/564x/5e/d9/15/5ed91505500b45218ba337b64d289ce2.jpg",
        "https://i.pinimg.com/564x/ef/eb/d5/efebd5b0417315939af60c242c9c32cc.jpg",
        "https://i.pinimg.com/564x/b5/e8/e9/b5e8e9c436fb3d3b08c9a333c8d5c48e.jpg",
      ],
      comments: 0,
      status: "inProgress",
    },
    {
      id: 8,
      title: "Payment method via e-commerce",
      tags: ["Research", "UX"],
      description:
        "On the main page there are several banners displayed. The latest main products are displayed at the top. The need for a call to action must also be considered when it is on the top web banner. Don't forget to enter the categories too",
      subTasks: [
        "Medium button",
        "Small button",
        "Hover button",
        "Ghost button",
      ],
      date: "Nov 18",
      files: 3,
      members: [
        "https://i.pinimg.com/564x/5e/d9/15/5ed91505500b45218ba337b64d289ce2.jpg",
        "https://i.pinimg.com/564x/ef/eb/d5/efebd5b0417315939af60c242c9c32cc.jpg",
        "https://i.pinimg.com/564x/b5/e8/e9/b5e8e9c436fb3d3b08c9a333c8d5c48e.jpg",
      ],
      comments: 0,
      status: "done",
    },
    {
      id: 9,
      title: "Create home ux writing content",
      tags: ["UX Writer", "UX"],
      description:
        "On the main page there are several banners displayed. The latest main products are displayed at the top. The need for a call to action must also be considered when it is on the top web banner. Don't forget to enter the categories too",
      subTasks: [
        "Medium button",
        "Small button",
        "Hover button",
        "Ghost button",
      ],
      date: "Nov 17",
      files: 3,
      members: [
        "https://i.pinimg.com/564x/5e/d9/15/5ed91505500b45218ba337b64d289ce2.jpg",
        "https://i.pinimg.com/564x/ef/eb/d5/efebd5b0417315939af60c242c9c32cc.jpg",
        "https://i.pinimg.com/564x/b5/e8/e9/b5e8e9c436fb3d3b08c9a333c8d5c48e.jpg",
      ],
      comments: 0,
      status: "upcoming",
    },
  ]);

  return (
    <>
      <Drawer
        title={
          selectedTask
            ? selectedTask.status === "upcoming"
              ? "Próximo"
              : selectedTask.status === "inProgress"
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
                    {selectedTask.status === "upcoming"
                      ? "Próximo"
                      : selectedTask.status === "inProgress"
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
                    5
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
        <ColTasks title={"Próximo"} numCards={12} index={1}>
          {data.map((task, index) => (
            <TaskCardProject
              index={task.id}
              taskData={task}
              onClick={() => showDrawer(task)}
              mobile
            />
          ))}
        </ColTasks>
        <ColTasks title={"En proceso"} numCards={12} index={2}>
          {data2.map((task, index) => (
            <TaskCardProject
              index={task.id}
              taskData={task}
              onClick={() => showDrawer(task)}
              mobile
            />
          ))}
        </ColTasks>
        <ColTasks title={"Terminadas"} numCards={12} index={3}>
          {data3.map((task, index) => (
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
