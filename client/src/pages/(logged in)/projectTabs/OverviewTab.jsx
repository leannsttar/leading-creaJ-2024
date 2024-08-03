import { useState, useEffect } from "react";
import { clienteAxios } from "@/config/clienteAxios";
import { TaskCardProject } from "../../../components/(logged in)/tasks/TaskCardProject.jsx";
import { ReplyComponent } from "@/components/(logged in)/messages/ReplyComponent.jsx";
import { useParams } from "react-router-dom";

import projectImage from "../../../assets/projectImage.jpg";

import { ProyectosContext } from "@/config/ProyectosContext";

import { Loader } from "@/components/Loader.jsx";
import { useSession } from "@/config/useSession";
import io from "socket.io-client";
const socket = io("http://localhost:5000");

const ActivityRecord = ({ img, message, date }) => {
  return (
    <div className="bg-white p-3 rounded-xl flex items-center gap-2">
      <img
        src={img}
        alt=""
        className="min-w-[3rem] min-h-[3rem] max-h-[3rem] max-w-[3rem] object-cover rounded-full"
      />
      <div>
        <p className="font-semibold">{message}</p>
        <p className="text-[#707070] font-light">{date}</p>
      </div>
    </div>
  );
};

export const OverviewTab = () => {
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
      title: "Paayment method via e-commerce",
      tags: ["Research", "UX"],
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
    {
      title: "Paayment method via e-commerce",
      tags: ["Research", "UX"],
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

  const { usuario } = useSession();

  const params = useParams();
  const [project, setProject] = useState("loading");

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await clienteAxios.get(
          `/api/projects/getProjectOverview/${params.id}`
        );
        // console.log(response.data);
        setProject(response.data);
      } catch (error) {
        console.log("Error al obtener el proyecto:", error);
      }
    })();
    // console.log(project)
  }, [params.id]);

  let lastSenderId = null;

  useEffect(() => {
    if (project?.id) {
      socket.emit("joinProject", project.id);

      const handleLoadMessages = (loadedMessages) => {
        setMessages(loadedMessages);
        console.log(loadedMessages);
      };

      socket.on("loadMessages", handleLoadMessages);

      return () => {
        socket.off("loadMessages", handleLoadMessages);
      };
    } else {
      setMessages([]);
    }
  }, [project]);

  if (project == "loading") return <Loader />;

  return (
    <div className="m-5 lg:m-12 lg:flex lg:gap-8">
      <div className="space-y-5 lg:w-[65%] 2xl:w-[70%]">
        <div className="bg-[#f7f7f7] px-4 py-3 rounded-xl flex items-start lg:items-center">
          <div className="space-y-3">
            <div className="flex">
              <img
                src={project.imagen}
                alt="Imagen proyecto"
                className="rounded-xl object-cover w-[8rem] h-[8rem] float-left mr-3 flex-shrink-0"
              />
              <div>
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-xl mb-2">
                    {project.name}{" "}
                    <span className="text-[#A692DF] font-normal">
                      {project.percentage}%
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-justify">{project.description}</p>
                </div>
              </div>
            </div>
            {/* <p className="font-semibold">
              Completitud: <span className="text-[#A692DF]">84%</span>
            </p> */}
          </div>
        </div>
        <div className="bg-[#f7f7f7] p-5 rounded-xl space-y-2 lg:hidden">
          <div className="flex justify-between items-center">
            <p className="font-bold">Actividad</p>
            <p className="text-[#1D7D81] font-bold">Ver todo</p>
          </div>
          <div className="space-y-2">
            <ActivityRecord
              img={
                "https://i.pinimg.com/564x/9b/62/2b/9b622b762d0a8f52349ccd76072ebb0c.jpg"
              }
              message={"Ellie joined team developers"}
              date={"04 April, 2021"}
            />
            <ActivityRecord
              img={
                "https://i.pinimg.com/564x/9b/62/2b/9b622b762d0a8f52349ccd76072ebb0c.jpg"
              }
              message={"Ellie joined team developers"}
              date={"04 April, 2021"}
            />
            <ActivityRecord
              img={
                "https://i.pinimg.com/564x/9b/62/2b/9b622b762d0a8f52349ccd76072ebb0c.jpg"
              }
              message={"Ellie joined team developers"}
              date={"04 April, 2021"}
            />
            <ActivityRecord
              img={
                "https://i.pinimg.com/564x/9b/62/2b/9b622b762d0a8f52349ccd76072ebb0c.jpg"
              }
              message={"Ellie joined team developers"}
              date={"04 April, 2021"}
            />
          </div>
        </div>
        <div className="space-y-4 lg:pt-5">
          <div>
            <p className="text-[1.5rem] font-semibold">Tareas más próximas</p>
            <div className="bg-[#5B5B5B] w-[6rem] h-[5px] rounded-full" />
          </div>
          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 2xl:grid-cols-3">
            {data.map((task, index) => (
              <TaskCardProject
                index={index}
                taskData={task}
                onClick={() => showDrawer(task)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="lg:w-[35%] 2xl:w-[30%] space-y-5">
        <div className="bg-[#f7f7f7] p-5 rounded-xl space-y-2 hidden lg:block">
          <div className="flex justify-between">
            <p className="font-bold">Actividad</p>
            <p className="text-[#1D7D81] font-bold">Ver todo</p>
          </div>
          <div className="space-y-2">
            <ActivityRecord
              img={
                "https://i.pinimg.com/564x/9b/62/2b/9b622b762d0a8f52349ccd76072ebb0c.jpg"
              }
              message={"Ellie joined team developers"}
              date={"04 April, 2021"}
            />
            <ActivityRecord
              img={
                "https://i.pinimg.com/564x/9b/62/2b/9b622b762d0a8f52349ccd76072ebb0c.jpg"
              }
              message={"Ellie joined team developers"}
              date={"04 April, 2021"}
            />
            <ActivityRecord
              img={
                "https://i.pinimg.com/564x/9b/62/2b/9b622b762d0a8f52349ccd76072ebb0c.jpg"
              }
              message={"Ellie joined team developers"}
              date={"04 April, 2021"}
            />
            <ActivityRecord
              img={
                "https://i.pinimg.com/564x/9b/62/2b/9b622b762d0a8f52349ccd76072ebb0c.jpg"
              }
              message={"Ellie joined team developers"}
              date={"04 April, 2021"}
            />
          </div>
        </div>
        <div className="bg-[#F7F7F7] px-3 py-5 rounded-xl hidden lg:block h-[20rem] overflow-y-scroll">
          <div className="space-y-1 mt-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500">No hay mensajes</div>
            ) : (
              messages.map((msg, index) => {
                const showImage = msg.sender.id !== lastSenderId;
                lastSenderId = msg.sender.id;

                return (
                  <ReplyComponent
                    key={index}
                    messages={[msg.content]}
                    img={showImage ? msg.sender.image : null}
                    name={msg.sender.name}
                    me={msg.sender.id === usuario.id}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
