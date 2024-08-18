import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUserNotifications = async (req, res) => {
  const { userId } = req.params;

  try {
    const notifications = await prisma.notifications.findMany({
      where: {
        userId: +userId,
      },
      include: {
        actionUser: true,
        project: true,
      },
    });

    res.status(200).json(notifications);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener las notificaciones" });
  }
};

export const getProjectNotifications = async (req, res) => {
  const { projectId } = req.params;

  try {
    const notifications = await prisma.notifications.findMany({
      where: {
        projectId: +projectId,
      },
      include: {
        actionUser: true,
        project: true,
      },
      orderBy: {
        event_time: "desc",
      },
    });

    // Agrupar notificaciones por contenido
    const groupedNotifications = notifications.reduce((acc, notification) => {
      const key = `${notification.content}_${notification.actionUserId}_${notification.type}`;
      if (!acc[key]) {
        acc[key] = notification;
      }
      return acc;
    }, {});

    // Convertir el objeto agrupado de vuelta a un array
    const uniqueNotifications = Object.values(groupedNotifications);

    // Ordenar las notificaciones únicas por fecha, más recientes primero
    uniqueNotifications.sort((a, b) => b.event_time - a.event_time);

    res.status(200).json(uniqueNotifications);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener las notificaciones" });
  }
};
