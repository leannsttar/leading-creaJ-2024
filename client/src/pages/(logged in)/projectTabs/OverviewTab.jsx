import { useState, useEffect, useRef } from "react";
import { clienteAxios } from "@/config/clienteAxios";
import { TaskCardProject } from "../../../components/(logged in)/tasks/TaskCardProject.jsx";
import { ReplyComponent } from "@/components/(logged in)/messages/ReplyComponent.jsx";
import { useParams, Link } from "react-router-dom";

import projectImage from "../../../assets/projectImage.jpg";

import { ProyectosContext } from "@/config/ProyectosContext";

import { format, formatDistanceToNow, parseISO, addDays } from "date-fns";
import { es } from "date-fns/locale";

import { TaskDrawer } from "@/components/(logged in)/tasks/TaskDrawer.jsx";

import { Loader } from "@/components/Loader.jsx";
import { useSession } from "@/config/useSession";
import io from "socket.io-client";
const socket = io("https://leading-crea-j-2024-server.vercel.app/");

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

const MiniActionRecord = ({ userImage, user, action, date }) => {
  return (
    <div className="flex items-center gap-2 mb-2">
      <img
        src={userImage}
        alt=""
        className="w-8 h-8 rounded-full object-cover"
      />
      <div>
        <p className="text-sm">
          <span className="font-semibold">{user}</span> {action}
        </p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
    </div>
  );
};

export const OverviewTab = () => {
  const { usuario } = useSession();
  const params = useParams();

  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [project, setProject] = useState("loading");
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [recentNotifications, setRecentNotifications] = useState([]);

  const fetchProjectData = async () => {
    try {
      setProject(undefined);
      setLoading(true);
      const response = await clienteAxios.get(
        `/api/projects/getProjectOverview/${params.id}`
      );

      setProject(response.data);
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
        })
      );
      setLoading(false);
    } catch (error) {
      console.log("Error al obtener el proyecto:", error);
    }
  };

  const fetchProjectData2 = async () => {
    try {
      setLoading(true);
      const response = await clienteAxios.get(
        `/api/projects/getProjectOverview/${params.id}`
      );

      setProject(response.data);
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
        })
      );
      setLoading(false);
    } catch (error) {
      console.log("Error al obtener el proyecto:", error);
    }
  };

  const getRecentNotifications = async () => {
    try {
      const response = await clienteAxios.get(
        `/api/notifications/getProjectNotifications/${params.id}`
      );
      const sortedNotifications = response.data
        .sort((a, b) => new Date(b.event_time) - new Date(a.event_time))
        .slice(0, 4);
      setRecentNotifications(sortedNotifications);
    } catch (error) {
      console.log("Error al obtener las notificaciones recientes", error);
    }
  };

  useEffect(() => {
    fetchProjectData();
    getRecentNotifications();
  }, [params.id]);

  const showDrawer = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  let lastSenderId = null;

  useEffect(() => {
    if (project?.id) {
      socket.emit("joinProject", project.id);

      const handleLoadMessages = (loadedMessages) => {
        setMessages(loadedMessages);
      };

      socket.on("loadMessages", handleLoadMessages);

      return () => {
        socket.off("loadMessages", handleLoadMessages);
      };
    } else {
      setMessages([]);
    }
  }, [project]);

  const scrollRef = useRef();
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (project == "loading" || project == undefined) return <Loader />;

  return (
    <>
      <TaskDrawer
        isOpen={open}
        task={selectedTask}
        close={onClose}
        project={project}
        reload={fetchProjectData2}
        overview
      />
   
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
            <div className="flex justify-between">
              <p className="font-bold">Actividad reciente</p>
              <Link to={`dashboard/project/${project.id}`}>
                <p className="text-[#1D7D81] font-bold cursor-pointer">
                  Ver todo
                </p>
              </Link>
            </div>
            <div className="space-y-2.5">
              {recentNotifications.length > 0 ? (
                recentNotifications.map((item, index) => (
                  <MiniActionRecord
                    key={index}
                    userImage={item.actionUser.image}
                    user={item.actionUser.name}
                    action={item.content}
                    date={formatDistanceToNow(new Date(item.event_time), {
                      addSuffix: true,
                      locale: es,
                    })}
                  />
                ))
              ) : (
                <p className="text-gray-500">No hay actividades recientes</p>
              )}
            </div>
          </div>
          <div className="space-y-4 lg:pt-5 pb-10 lg:pb-0">
            <div>
              <p className="text-[1.5rem] font-semibold">Tareas más próximas</p>
              <div className="bg-[#5B5B5B] w-[6rem] h-[5px] rounded-full" />
            </div>
            <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 2xl:grid-cols-3">
              {upcomingTasks.length === 0 ? (
                <p className="text-gray-500">
                  No hay tareas próximas por ahora.
                </p>
              ) : (
                upcomingTasks
                  .filter((task) => task.status === "proximo")
                  .map((task) => (
                    <TaskCardProject
                      key={task.id}
                      index={task.id}
                      taskData={task}
                      onClick={() => showDrawer(task)}
                      mobile
                    />
                  ))
              )}
            </div>
          </div>
        </div>
        <div className="lg:w-[35%] 2xl:w-[30%] space-y-5">
          <div className="bg-[#f7f7f7] p-5 rounded-xl space-y-2 hidden lg:block">
            <div className="flex justify-between">
              <p className="font-bold">Actividad reciente</p>
              <Link to={`timeline`}>
                <p className="text-[#1D7D81] font-bold cursor-pointer">
                  Ver todo
                </p>
              </Link>
            </div>
            <div className="space-y-2.5">
              {recentNotifications.length > 0 ? (
                recentNotifications.map((item, index) => (
                  <MiniActionRecord
                    key={index}
                    userImage={item.actionUser.image}
                    user={item.actionUser.name}
                    action={item.content}
                    date={formatDistanceToNow(new Date(item.event_time), {
                      addSuffix: true,
                      locale: es,
                    })}
                  />
                ))
              ) : (
                <p className="text-gray-500">No hay actividades recientes</p>
              )}
            </div>
          </div>
          <div
            className="bg-[#F7F7F7] px-3 py-5 rounded-xl hidden lg:block h-[20rem] overflow-y-scroll "
            ref={scrollRef}
          >
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
    </>
  );
};
