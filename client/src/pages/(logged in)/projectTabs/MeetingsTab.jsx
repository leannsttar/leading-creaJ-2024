import { useState } from "react";

import { clienteAxios } from "@/config/clienteAxios";
import { useSession } from "@/config/useSession";

import allMeetingsIcon from "../../../assets/allMeetingsIcon.svg";
import upcomingMeetingsIcon from "../../../assets/UpcomingMeetingsIcon.svg";
import pastMeetingsIcon from "../../../assets/pastMeetingsIcon.svg";

import { Modal, DatePicker, TimePicker, Input, Form, Button } from "antd";
import dayjs from "dayjs";
const format = "HH:mm";

const { TextArea } = Input;

const MeetingsSection = ({ icon, title, numMeetings }) => {
  return (
    <div className="flex items-center gap-7 ">
      <div className="bg-white rounded-full grid place-content-center h-[5rem] w-[5rem]">
        <img src={icon} alt="" className="p-5" />
      </div>
      <div>
        <p className="text-[1.1rem] text-[#343434]">{title}</p>
        <div className="flex items-center gap-5">
          <p className="text-2xl font-semibold">{numMeetings}</p>
          <p className="text-[#8A8A8A]">Meet</p>
        </div>
      </div>
    </div>
  );
};

const MeetingCard = ({
  userName,
  userPicture,
  time,
  going,
  pending,
  teamPictures,
}) => {
  return (
    <div className="bg-[#f7f7f7] p-7 rounded-2xl space-y-10 ">
      <div className=" flex items-center gap-3">
        <img
          src={userPicture}
          alt=""
          className="rounded-full object-cover min-w-[6rem] min-h-[6rem] max-w-[6rem] max-h-[6rem]"
        />
        <div className="space-y-1">
          <p className="text-[1.4rem] leading-6">{userName}</p>
          <p className="text-[1.3rem] text-[#8A8A8A]">{time}</p>
        </div>
      </div>
      <div className="space-y-8">
        <div className="flex flex-wrap justify-between">
          <p className="text-[#3694FF]">{going} confirmados</p>
          <p className="text-[#E95050]">{pending} pendientes</p>
        </div>
        <div className="flex items-center">
          <div className="flex">
            {teamPictures.map((picture, index) => {
              return (
                <img
                  key={index}
                  src={picture}
                  className={`rounded-full object-cover relative ${
                    index === 1
                      ? " right-[1.25rem]"
                      : index === 2
                      ? "right-[2.5rem]"
                      : index === 3
                      ? "right-[3.75rem]"
                      : ""
                  } min-w-[3rem] min-h-[3rem] max-w-[3rem] max-h-[3rem]`}
                />
              );
            })}
          </div>
          <p className="whitespace-nowrap relative right-9 text-[#8A8A8A]">
            + {going - 4} más
          </p>
        </div>
        <button className="bg-[#202020] w-full text-white py-2 rounded-lg">
          Ver detalles
        </button>
      </div>
    </div>
  );
};

export const MeetingsTab = () => {
  const { logout, usuario, userToken } = useSession();

  const [meetingDate, setMeetingDate] = useState();
  const [meetingLink, setMeetingLink] = useState();

  const [modal1Open, setModal1Open] = useState(false);

  const onFinish = async () => {
    try {
      const formData = new FormData();

      formData.append("fecha", meetingDate);
      formData.append("enlace", meetingLink);
      formData.append("proyectoId", 13)
      formData.append("usuarioId", usuario.id)

      const response = await clienteAxios.postForm(
        "/api/projects/createMeeting",
        formData,
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      );

      console.log("Respuesta del backend:", response.data);
      // setModal2Open(false);
    } catch (error) {
      console.error("Error al enviar los datos", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Fallo:", errorInfo);
  };
  
  
  // const [formData, setFormData] = useState({
  //   date: null,
  //   time: null,
  //   meetLink: "",
  //   description: "",
  // });

  // const onDateChange = (date) => {
  //   setFormData({
  //     ...formData,
  //     date,
  //   });
  // };

  // const onTimeChange = (time) => {
  //   setFormData({
  //     ...formData,
  //     time,
  //   });
  // };

  // const onLinkChange = (event) => {
  //   setFormData({
  //     ...formData,
  //     meetLink: event.target.value,
  //   });
  // };

  // const onDescriptionChange = (event) => {
  //   setFormData({
  //     ...formData,
  //     description: event.target.value,
  //   });
  // };

  // const handleSubmit = () => {
  //   // Submit the form data to your server or perform other actions
  //   console.log("Submitting form data:", formData);
  // };
  return (
    <div className="m-5 lg:m-16">
      <div className="bg-[#f5f5f5] lg:w-fit p-8 rounded-2xl space-y-5  lg:flex lg:space-y-0 lg:gap-5">
        <div className="lg:border-r-[2px] lg:pr-5 border-[#e0e0e0]">
          <MeetingsSection
            icon={allMeetingsIcon}
            title={"No. de Reuniones"}
            numMeetings={36}
          />
        </div>
        <hr className="border-[1px] border-[#e0e0e0] lg:hidden" />

        <div className="lg:border-r-[2px] lg:pr-5 border-[#e0e0e0]">
          <MeetingsSection
            icon={upcomingMeetingsIcon}
            title={"Reuniones próximas"}
            numMeetings={15}
          />
        </div>
        <hr className="border-[1px] border-[#e0e0e0] lg:hidden" />
        <div>
          <MeetingsSection
            icon={pastMeetingsIcon}
            title={"Reuniones pasadas"}
            numMeetings={21}
          />
        </div>
      </div>
      <button
        onClick={() => setModal1Open(true)}
        className="px-4 py-2 bg-gray-100 mt-10 rounded-lg"
      >
        Crear una nueva reunión
      </button>
      <Modal
        title="Crear nueva reunión"
        okButtonProps={{ style: { backgroundColor: "black", color: "white" } }}
        okText="Crear reunión"
        centered
        open={modal1Open}
        onOk={onFinish}
        onCancel={() => setModal1Open(false)}
      >
        <div className="">
          <Form
            layout="vertical"
            
            style={{ width: 400, margin: "20px" }}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Fecha de la reunión"
              name="date"
              rules={[
                {
                  required: true,
                  message: "Por favor, seleccione una fecha",
                },
              ]}
            >
              <DatePicker onChange={(date) => setMeetingDate(date)} placeholder="Fecha"/>
            </Form.Item >

            {/* <Form.Item
              label="Hora de la reunión"
              name="time"
              rules={[
                {
                  required: true,
                  message: "Por favor, seleccione una hora",
                },
              ]}
            >
              <TimePicker format="HH:mm" onChange={onTimeChange} placeholder="Hora"/>
            </Form.Item> */}

            <Form.Item
              label="Enlace de la reunión"
              name="meetLink"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingrese el enlace de la reunión",
                },
              ]}
            >
              <Input onChange={(e) => setMeetingLink(e.target.value)}  placeholder="Enlace del meet" />
            </Form.Item>

            {/* <Form.Item
              label="Descripción de la reunión"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingrese una descripción de la reunión",
                },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Descripción de la reunión"
                onChange={onDescriptionChange}
              />
            </Form.Item> */}


          </Form>
        </div>
      </Modal>
      <div className="mt-14">
        <p className="text-[1.5rem] font-semibold">Reuniones próximas</p>
        <div className="bg-[#5B5B5B] w-[6rem] h-[5px] rounded-full" />
      </div>
      <div className="mt-5 lg:mt-8 space-y-6 md:grid md:grid-cols-2 md:space-y-0 md:gap-4 lg:grid-cols-3 xl:gap-[3rem] 3xl:grid-cols-4">
        <MeetingCard
          userName={"Mashle Burnedead"}
          userPicture={
            "https://i.pinimg.com/564x/ab/a6/bb/aba6bb42cb08e35ac0d71e6044566b0a.jpg"
          }
          time={"11:00 AM"}
          going={11}
          pending={2}
          teamPictures={[
            "https://i.pinimg.com/564x/5e/c5/99/5ec599c89cd988a416d361a123c14faa.jpg",
            "https://i.pinimg.com/736x/01/4d/59/014d59542d152dd54e9c94091c3d8dd4.jpg",
            "https://i.pinimg.com/736x/93/d4/ae/93d4aeb0fdf135036c70448e610dd78b.jpg",
            "https://i.pinimg.com/736x/7c/d1/ab/7cd1abc221a4ad00720a989ac89a6218.jpg",
          ]}
        />
        <MeetingCard
          userName={"Mashle Burnedead"}
          userPicture={
            "https://i.pinimg.com/564x/ab/a6/bb/aba6bb42cb08e35ac0d71e6044566b0a.jpg"
          }
          time={"11:00 AM"}
          going={4}
          pending={10}
          teamPictures={[
            "https://i.pinimg.com/564x/5e/c5/99/5ec599c89cd988a416d361a123c14faa.jpg",
            "https://i.pinimg.com/736x/01/4d/59/014d59542d152dd54e9c94091c3d8dd4.jpg",
            "https://i.pinimg.com/736x/93/d4/ae/93d4aeb0fdf135036c70448e610dd78b.jpg",
            "https://i.pinimg.com/736x/7c/d1/ab/7cd1abc221a4ad00720a989ac89a6218.jpg",
          ]}
        />
        <MeetingCard
          userName={"Mashle Burnedead"}
          userPicture={
            "https://i.pinimg.com/564x/ab/a6/bb/aba6bb42cb08e35ac0d71e6044566b0a.jpg"
          }
          time={"11:00 AM"}
          going={9}
          pending={3}
          teamPictures={[
            "https://i.pinimg.com/564x/5e/c5/99/5ec599c89cd988a416d361a123c14faa.jpg",
            "https://i.pinimg.com/736x/01/4d/59/014d59542d152dd54e9c94091c3d8dd4.jpg",
            "https://i.pinimg.com/736x/93/d4/ae/93d4aeb0fdf135036c70448e610dd78b.jpg",
            "https://i.pinimg.com/736x/7c/d1/ab/7cd1abc221a4ad00720a989ac89a6218.jpg",
          ]}
        />
      </div>
    </div>
  );
};
