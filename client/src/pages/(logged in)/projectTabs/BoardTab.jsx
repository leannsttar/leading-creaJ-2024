import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
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
                    message: 'Please enter user name',
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
                    message: 'Please enter url',
                  },
                ]}
              >
                <Input
                  style={{
                    width: '100%',
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
                    message: 'Please select an owner',
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
                    message: 'Please choose the type',
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
                    message: 'Please choose the approver',
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
                    message: 'Please choose the dateTime',
                  },
                ]}
              >
                <DatePicker.RangePicker
                  style={{
                    width: '100%',
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
                    message: 'please enter url description',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="please enter url description" />
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
      <img src={plusTasksIcon} alt="add icon" className="w-8 cursor-pointer" onClick={showDrawer}/>
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

  const [data, setData] = useState([
    {
      "title": "Payment method via e-commerce",
      "tags": ["Research", "UX"],
      "subTasks": [2, 10],
      "date": "Nov 16",
      "files": 3,
      "members": [
        "https://i.pinimg.com/564x/5e/d9/15/5ed91505500b45218ba337b64d289ce2.jpg",
        "https://i.pinimg.com/564x/ef/eb/d5/efebd5b0417315939af60c242c9c32cc.jpg",
        "https://i.pinimg.com/564x/b5/e8/e9/b5e8e9c436fb3d3b08c9a333c8d5c48e.jpg"
      ],
      "comments": 0,
      "status": "upcoming"
    },
    {
      "title": "Payment method via e-commerce",
      "tags": ["Research", "UX"],
      "subTasks": [2, 10],
      "date": "Nov 16",
      "files": 3,
      "members": [
        "https://i.pinimg.com/564x/5e/d9/15/5ed91505500b45218ba337b64d289ce2.jpg",
        "https://i.pinimg.com/564x/ef/eb/d5/efebd5b0417315939af60c242c9c32cc.jpg",
        "https://i.pinimg.com/564x/b5/e8/e9/b5e8e9c436fb3d3b08c9a333c8d5c48e.jpg"
      ],
      "comments": 0,
      "status": "upcoming"
    }, {
      "title": "Payment method via e-commerce",
      "tags": ["Research", "UX"],
      "subTasks": [2, 10],
      "date": "Nov 16",
      "files": 3,
      "members": [
        "https://i.pinimg.com/564x/5e/d9/15/5ed91505500b45218ba337b64d289ce2.jpg",
        "https://i.pinimg.com/564x/ef/eb/d5/efebd5b0417315939af60c242c9c32cc.jpg",
        "https://i.pinimg.com/564x/b5/e8/e9/b5e8e9c436fb3d3b08c9a333c8d5c48e.jpg"
      ],
      "comments": 0,
      "status": "upcoming"
    },
  ])

  return (
    <div className="mx-5 my-9 lg:mx-11 lg:my-16 space-y-10 lg:flex lg:space-y-0 lg:justify-around">
      <ColTasks title={"Próximo"} numCards={12}>
        {data.map((task, index) => (

          <TaskCardProject
            index={index}
            title={task.title}
            tags={task.tags}
            subTasks={task.subTasks}
            date={task.date}
            files={task.files}
            members={task.members}
            comments={task.comments}
            mobile
            status={task.status}

          />

        ))}
      </ColTasks>
      <ColTasks title={"En proceso"} numCards={12}>
        {data.map((task, index) => (

          <TaskCardProject
            index={index}
            title={task.title}
            tags={task.tags}
            subTasks={task.subTasks}
            date={task.date}
            files={task.files}
            members={task.members}
            comments={task.comments}
            mobile
            status={task.status}

          />

        ))}
      </ColTasks>
      <ColTasks title={"Terminadas"} numCards={12}>
        {data.map((task, index) => (

          <TaskCardProject
            index={index}
            title={task.title}
            tags={task.tags}
            subTasks={task.subTasks}
            date={task.date}
            files={task.files}
            members={task.members}
            comments={task.comments}
            mobile
            status={task.status}

          />

        ))}
      </ColTasks>
    </div>
  );
};
