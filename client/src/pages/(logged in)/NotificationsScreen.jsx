import { useEffect, useState } from "react";
import { useSession } from "@/config/useSession";
import { clienteAxios } from "@/config/clienteAxios";
import { Loader } from "../../components/Loader.jsx";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import useProject from "@/hooks/useProject.jsx";
import { Link } from "react-router-dom";

export const NotificationsScreen = () => {
  const { proyectos } = useProject();

  const { usuario } = useSession();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNotifications = async () => {
    try {
      const response = await clienteAxios.get(
        `/api/notifications/getUserNotifications/${usuario.id}`
      ); 
      // Ordenar las notificaciones por fecha, más nuevas primero
      const sortedNotifications = response.data.sort(
        (a, b) => new Date(b.event_time) - new Date(a.event_time)
      );
      setNotifications(sortedNotifications);
    } catch (error) {
      console.log("Error al obtener las notificaciones", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotificationTypeText = (type) => {
    switch (type) {
      case "new_comment":
        return "Nuevo comentario";
      case "new_link":
        return "Nuevo enlace";
      case "subtask_status_update":
        return "Actualización de subtarea";
      case "task_edit":
        return "Edición de tarea";
      case "new_tags":
        return "Nuevas etiquetas";
      case "task_status_change":
        return "Cambio de estado de tarea";
      default:
        return "Notificación";
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="m-8 space-y-4">
      {notifications.length > 0 ? (
        notifications.map(
          (notification, index) => (

            (
              <div
                key={index}
                className="border-b border-[#ECECEC] pb-4 flex gap-2 items-center"
              >
                <img
                  className="min-w-[3rem] min-h-[3rem] max-w-[3rem] max-h-[3rem] rounded-full object-cover"
                  src={notification.actionUser.image}
                  alt=""
                />
                <div>
                  <p className="font-bold">
                    {getNotificationTypeText(notification.type)}
                  </p>
                  <p>{notification.content}</p>

                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(notification.event_time), {
                        addSuffix: true,
                        locale: es,
                      })}{" "}
                      en
                    </p>
                    <Link className="cursor-pointer" to={`/dashboard/project/${notification.project.id}`}>
                      <div className="flex gap-1 items-center">
                        <img
                          className="min-w-[1.5rem] min-h-[1.5rem] max-w-[1.5rem] max-h-[1.5rem] rounded-full object-cover"
                          src={notification.project.imagen}
                          alt=""
                        />
                        <p>{notification.project.name}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )
          )
        )
      ) : (
        <p>No tienes notificaciones</p>
      )}
    </div>
  );
};
