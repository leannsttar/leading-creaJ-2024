import { useState, useRef, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { PlusOutlined } from "@ant-design/icons";
import { TbEdit } from "react-icons/tb";

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
} from "antd";
const { Option } = Select;

import { TaskCardProject } from "@/components/(logged in)/TaskCardProject";

import plusTasksIcon from "../../../assets/plusTasksIcon.svg";

const HeaderTaskCards = ({ title, numCards }) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer
        title="Create a new account"
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
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter user name",
                  },
                ]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
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
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="owner"
                label="Owner"
                rules={[
                  {
                    required: true,
                    message: "Please select an owner",
                  },
                ]}
              >
                <Select placeholder="Please select an owner">
                  <Option value="xiao">Xiaoxiao Fu</Option>
                  <Option value="mao">Maomao Zhou</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[
                  {
                    required: true,
                    message: "Please choose the type",
                  },
                ]}
              >
                <Select placeholder="Please choose the type">
                  <Option value="private">Private</Option>
                  <Option value="public">Public</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
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
                label="DateTime"
                rules={[
                  {
                    required: true,
                    message: "Please choose the dateTime",
                  },
                ]}
              >
                <DatePicker.RangePicker
                  style={{
                    width: "100%",
                  }}
                  getPopupContainer={(trigger) => trigger.parentElement}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "please enter url description",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="please enter url description"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
      <div className="bg-[#F7F7F7] flex justify-between py-3 px-5 rounded-[1.5rem] lg:w-[80%]">
        <div>
          <p className="text-xl font-semibold">{title}</p>
          <p className="text-[#959595]">{numCards} cards de tareas</p>
        </div>
        <img
          src={plusTasksIcon}
          alt="add icon"
          className="w-8 cursor-pointer"
          onClick={showDrawer}
        />
      </div>
    </>
  );
};

const ColTasks = ({ title, numCards, children }) => {
  return (
    <div className="space-y-3 lg:w-[30%] lg:space-y-8">
      <HeaderTaskCards title={title} numCards={numCards} />
      <div className="flex gap-3 overflow-auto pb-2 lg:flex-col lg:gap-6">
        {children}
      </div>
    </div>
  );
};

export const BoardTab = () => {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
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

  useEffect(() => clearTimer, []);

  // const handleSubmit = (values) => {
  //   console.log("Received values:", values);

  // };

  const [data, setData] = useState([
    {
      title: "Payment method via e-commerce",
      tags: ["Research", "UX"],
      description:
        "On the main page there are several banners displayed. The latest main products are displayed at the top. The need for a call to action must also be considered when it is on the top web banner. Don't forget to enter the categories too",
      subTasks: [2, 10],
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
      title: "Payment method via e-commerce",
      tags: ["Research", "UX"],
      description:
        "On the main page there are several banners displayed. The latest main products are displayed at the top. The need for a call to action must also be considered when it is on the top web banner. Don't forget to enter the categories too",
      subTasks: [2, 10],
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
      title: "Paayment method via e-commerce",
      tags: ["Research", "UX"],
      description:
        "On the main page there are several banners displayed. The latest main products are displayed at the top. The need for a call to action must also be considered when it is on the top web banner. Don't forget to enter the categories too",
      subTasks: [2, 10],
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
        height={isMobile && 800}
        placement={isMobile ? 'bottom' : 'right'}
        onClose={onClose}
        loading={loading}
        visible={open}
        bodyStyle={{ padding: "2rem", fontFamily: "Inter" }}
        footer={
          <Space>
            <Button onClick={onClose}>Cerrar</Button>
          </Space>
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
                      <div className="flex items-center justify-center rounded-full w-[2rem] h-[2rem] bg-[#e6e6e6] relative right-3">
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
                    <div className="flex gap-2">
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
                      <p className="border-[1px] flex items-center gap-1 text-[#000] px-2 py-1 rounded-2xl">
                        Añadir etiqueta{" "}
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
                <TbEdit size={23} opacity={.4}/>
              </div>
              <p className="text-[#5c5c5c]">On the main page there are several banners displayed. The latest main products are displayed at the top. The need for a call to action must also be considered when it is on the top web banner. Don't forget to enter the categories too</p>
              
            </div>
          </>
        )}
      </Drawer>
      <div className="mx-5 my-9 lg:mx-11 lg:my-16 space-y-10 lg:flex lg:space-y-0 lg:justify-around">
        <ColTasks title={"Próximo"} numCards={12}>
          {data.map((task, index) => (
            <TaskCardProject
              index={index}
              taskData={task}
              onClick={() => showDrawer(task)}
              mobile
            />
          ))}
        </ColTasks>
        <ColTasks title={"En proceso"} numCards={12}>
          {data.map((task, index) => (
            <TaskCardProject
              index={index}
              taskData={task}
              onClick={() => showDrawer(task)}
              mobile
            />
          ))}
        </ColTasks>
        <ColTasks title={"Terminadas"} numCards={12}>
          {data.map((task, index) => (
            <TaskCardProject
              index={index}
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
