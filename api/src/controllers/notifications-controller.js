import { PrismaClient } from '@prisma/client';
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
      }
    });

    res.status(200).json(notifications);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
};
