import React, { useState, useEffect, memo } from "react";
import { clienteAxios } from "@/config/clienteAxios";
import { TaskCardProject } from "../../../components/(logged in)/tasks/TaskCardProject.jsx";
import { TaskDrawer } from "../../../components/(logged in)/tasks/TaskDrawer.jsx";
import { useSession } from "@/config/useSession";
import { Loader } from "../../../components/Loader.jsx";
import { format, addDays, formatDistanceToNow, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import useProject from "@/hooks/useProject.jsx";

const TaskColumn = memo(({ title, tasks, noTasksMessage, onTaskClick }) => (
  <div className="w-full lg:w-[30%] p-4">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <div className="space-y-2">
      {tasks && tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCardProject
            key={task.id}
            index={task.id}
            taskData={task}
            onClick={() => onTaskClick(task)}
            mobile
          />
        ))
      ) : (
        <p>{noTasksMessage}</p>
      )}
    </div>
  </div>
));

export const TasksBoardTab = () => {
  const { usuario } = useSession();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [tasksPorHacer, setTasksPorHacer] = useState([]);
  const [tasksEnProceso, setTasksEnProceso] = useState([]);
  const [tasksTerminadas, setTasksTerminadas] = useState([]);

  useEffect(() => {
    fetchUserTasks();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      setTasksPorHacer(filterTasksByStatus("proximo"));
      setTasksEnProceso(filterTasksByStatus("en progreso"));
      setTasksTerminadas(filterTasksByStatus("terminado"));
    }
  }, [tasks]);

  const filterTasksByStatus = (status) =>
    tasks.filter((task) => task.status === status);

  const fetchUserTasks = async () => {
    try {
      
      setLoading(true);
      const response = await clienteAxios.get(
        `/api/tasks/getUserTasks/${usuario.id}`
      );

      const allTasks = response.data.map((task) => {
        // Obtener el equipo del proyecto asociado a la tarea
        const projectTeam = task.project?.team || [];

        return {
          id: task.id,
          title: task.name,
          creator: task.creator,
          tags: task.tags.map(
            (taskTag) =>
              task.project.tags.find(
                (projectTag) => projectTag.id === taskTag.tagId
              )?.name
          ),
          description: task.description,
          subTasks: task.subTasks,
          progressList: task.subTasks.filter(
            (subTask) => subTask.status === "terminado"
          ).length,
          date: format(addDays(task.due_date, 1), "PP", { locale: es }),
          members: task.assignees
            .map((assignee) => {
              const member = projectTeam.find(
                (projectMember) => projectMember.user.id === assignee.userId
              )?.user;
              return member
                ? {
                    id: member.id,
                    name: member.name,
                    image: member.image,
                  }
                : null;
            })
            .filter((member) => member !== null),
          files: task.files,
          links: task.links,
          comments: task.comments.map((comment) => {
            const creator = projectTeam.find(
              (member) => member.user.id === comment.authorId
            )?.user;

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
              creatorId: creator?.id || null,
              creatorImage: creator?.image || "",
              creatorName: creator?.name || "",
            };
          }),
          status: task.status,
          project: task.project,
        };
      });
      setTasks(allTasks);
    } catch (error) {
      console.log("Error al obtener las tareas del usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserTasks2 = async () => {
    try {
      setLoading(true);
      const response = await clienteAxios.get(
        `/api/tasks/getUserTasks/${usuario.id}`
      );

      const allTasks = response.data.map((task) => {
        // Obtener el equipo del proyecto asociado a la tarea
        const projectTeam = task.project?.team || [];

        return {
          id: task.id,
          title: task.name,
          creator: task.creator,
          tags: task.tags.map(
            (taskTag) =>
              task.project.tags.find(
                (projectTag) => projectTag.id === taskTag.tagId
              )?.name
          ),
          description: task.description,
          subTasks: task.subTasks,
          progressList: task.subTasks.filter(
            (subTask) => subTask.status === "terminado"
          ).length,
          date: format(addDays(task.due_date, 1), "PP", { locale: es }),
          members: task.assignees
            .map((assignee) => {
              const member = projectTeam.find(
                (projectMember) => projectMember.user.id === assignee.userId
              )?.user;
              return member
                ? {
                    id: member.id,
                    name: member.name,
                    image: member.image,
                  }
                : null;
            })
            .filter((member) => member !== null),
          files: task.files,
          links: task.links,
          comments: task.comments.map((comment) => {
            const creator = projectTeam.find(
              (member) => member.user.id === comment.authorId
            )?.user;

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
              creatorId: creator?.id || null,
              creatorImage: creator?.image || "",
              creatorName: creator?.name || "",
            };
          }),
          status: task.status,
          project: task.project,
        };
      });
      setTasks(allTasks);
    } catch (error) {
      console.log("Error al obtener las tareas del usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  const showDrawer = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  if (loading) {
    return <Loader />;
  }

  if (tasks.length === 0) {
    return <p className="text-gray-500">No hay tareas por ahora</p>;
  }
  return (
    <>
      <TaskDrawer
        isOpen={open}
        task={selectedTask}
        close={onClose}
        project={selectedTask?.project}
        reload={fetchUserTasks2}
      />
      <div className="w-full flex overflow-x-auto my-5 mx-7">
        <div className="flex w-full">
          <TaskColumn
            title="Por hacer:"
            tasks={tasksPorHacer}
            noTasksMessage="No hay tareas próximas"
            onTaskClick={showDrawer}
          />
          <TaskColumn
            title="En proceso:"
            tasks={tasksEnProceso}
            noTasksMessage="No hay tareas en proceso"
            onTaskClick={showDrawer}
          />
          <TaskColumn
            title="Terminadas:"
            tasks={tasksTerminadas}
            noTasksMessage="No hay tareas terminadas"
            onTaskClick={showDrawer}
          />
        </div>
      </div>
    </>
  );
};
