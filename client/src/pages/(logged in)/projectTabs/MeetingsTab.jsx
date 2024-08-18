import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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

export const MeetingsList = ({ meetings, validatedAttendance }) => {
  const { usuario, logout } = useSession();
  return (
    <>
      <div className="mt-14">
        <p className="text-[1.5rem] font-semibold">Reuniones próximas</p>
        <div className="bg-[#5B5B5B] w-[6rem] h-[5px] rounded-full" />
      </div>
      <div className="mt-5 lg:mt-8 space-y-6 md:grid md:grid-cols-2 md:space-y-0 md:gap-4 lg:grid-cols-3 xl:gap-[3rem] 3xl:grid-cols-4">
        {meetings.map((meeting) => {
          return (
            <MeetingCard
              userName={meeting.author.name}
              userPicture={meeting.author.image}
              time={meeting.event_time}
              going={meeting.attendance.length}
              link={meeting.id}
              teamPictures={meeting.attendance}
              validatedAttendance={meeting.attendance.some((member) => {
                return member.userId == usuario.id;
              })}
            />
          );
        })}
      </div>
    </>
  );
};

const MeetingCard = ({
  userName,
  userPicture,
  time,
  going,
  teamPictures,
  link,
  validatedAttendance,
}) => {
  const params = useParams();
  const { logout, usuario, userToken } = useSession();
  const [modal2Open, setModal2Open] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [attendanceConfirmed, setAttendanceConfirmed] = useState(false);

  useEffect(() => {
    if (validatedAttendance) {
      setConfirmationMessage("Asistencia confirmada");
    }
  }, []);

  useEffect(() => {
    // comprobar la asistencia
    const checkAttendance = async () => {
      try {
        const response = await clienteAxios.get(
          `/api/meetings/attendance/${link}/${usuario.id}`
        );
        if (response.data.attendanceConfirmed) {
          setAttendanceConfirmed(true);
          setConfirmationMessage("Asistencia confirmada");
        }
      } catch (error) {
        console.error("Error al verificar la asistencia:", error);
      }
    };

    checkAttendance();
  }, [link, usuario.id]);

  const onFinishConfirm = async () => {
    try {
      const response = await clienteAxios.post(
        "/api/projects/meetings/attendance",
        {
          meetingId: link,
          userId: usuario.id,
        }
      );
      console.log("Asistencia confirmada:", response.data);
      setConfirmationMessage("Asistencia confirmada");
      setAttendanceConfirmed(true);
      setModal2Open(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
          <Link className="text-[#7866e0] underline text-lg" to={link}>
            Ir a la reunión
          </Link>
        </div>
        <div className="flex items-center">
          <div className="flex">
            {teamPictures.map((picture, index) => {
              return (
                <img
                  key={picture.user.id}
                  src={picture.user.image}
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
        </div>
        {attendanceConfirmed || validatedAttendance ? (
          <p className="text-lg text-center text-emerald-600 font-inter">
            {confirmationMessage}
          </p>
        ) : (
          <>
            <button
              className="bg-[#202020] w-full text-white py-2 rounded-lg"
              onClick={() => setModal2Open(true)}
            >
              Confirmar asistencia
            </button>
            <Modal
              title="Confirmar asistencia"
              okButtonProps={{
                style: { backgroundColor: "black", color: "white" },
              }}
              okText="Confirmar"
              centered
              open={modal2Open}
              onOk={onFinishConfirm}
              onCancel={() => setModal2Open(false)}
            >
              <p>
                ¿Estás seguro de que deseas confirmar tu asistencia a esta
                reunión?
              </p>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export const MeetingsTab = () => {
  const { logout, usuario, userToken } = useSession();
  const params = useParams();
  const [meetings, setMeetings] = useState([]);
  const [validatedAttendance, setValidatedAttendance] = useState();

  const fetchMeetings = async () => {
    try {
      const response = await clienteAxios.get(
        `/api/projects/meetings/${params.id}`,
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      );
      setMeetings(response.data.meetings);
    } catch (error) {
      console.error("Error al obtener las reuniones:", error);
    }
  };
  useEffect(() => {
    fetchMeetings();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await clienteAxios.get(`/api/meetings/${params.id}`);
        const { totalMeetings, pastMeetings, upcomingMeetings } = response.data;

        setStats({
          totalMeetings,
          pastMeetings,
          upcomingMeetings,
        });
      } catch (error) {
        console.error("Error al obtener las estadísticas de reuniones:", error);
      }
    };

    fetchStats();
  }, [params.id]);


  const [stats, setStats] = useState({
    totalMeetings: 0,
    pastMeetings: 0,
    upcomingMeetings: 0,
  });
  
  const [meetingDate, setMeetingDate] = useState();
  const [meetingLink, setMeetingLink] = useState();
  const [modal1Open, setModal1Open] = useState(false);

  const onFinish = async () => {
    try {
      const formData = new FormData();

      formData.append("fecha", meetingDate);
      formData.append("enlace", meetingLink);
      formData.append("proyectoId", params.id);
      formData.append("usuarioId", usuario.id);

      const response = await clienteAxios.postForm(
        "/api/projects/createMeeting",
        formData,
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      );
      setModal1Open(false);
      fetchMeetings();
      console.log("Respuesta del backend:", response.data);
      // setModal2Open(false);
    } catch (error) {
      console.error("Error al enviar los datos", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Fallo:", errorInfo);
  };

  return (
    <div className="m-5 lg:m-16">
      <div className="bg-[#f5f5f5] lg:w-fit p-8 rounded-2xl space-y-5 lg:flex lg:space-y-0 lg:gap-5">
        <div className="lg:border-r-[2px] lg:pr-5 border-[#e0e0e0]">
          <MeetingsSection
            icon={allMeetingsIcon}
            title={"No. de Reuniones"}
            numMeetings={stats.totalMeetings}
          />
        </div>
        <hr className="border-[1px] border-[#e0e0e0] lg:hidden" />

        <div className="lg:border-r-[2px] lg:pr-5 border-[#e0e0e0]">
          <MeetingsSection
            icon={upcomingMeetingsIcon}
            title={"Reuniones próximas"}
            numMeetings={stats.upcomingMeetings}
          />
        </div>
        <hr className="border-[1px] border-[#e0e0e0] lg:hidden" />
        <div>
          <MeetingsSection
            icon={pastMeetingsIcon}
            title={"Reuniones pasadas"}
            numMeetings={stats.pastMeetings}
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
              <DatePicker
                onChange={(date) => setMeetingDate(date)}
                placeholder="Fecha"
              />
            </Form.Item>

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
              <Input
                onChange={(e) => setMeetingLink(e.target.value)}
                placeholder="Enlace del meet"
              />
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

      <MeetingsList
        meetings={meetings}
        validatedAttendance={validatedAttendance}
      />
    </div>
  );
};
