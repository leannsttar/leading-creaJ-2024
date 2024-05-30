import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProject = async (req, res) => {
  const { nombre, descripcion, usuarioId } = req.body;

  if (!req.file || !nombre || !descripcion) {
    return res.status(400).json({ error: "Faltan campos" });
  }

  const imagePath = req.file.path;

  try {
    const newProject = await prisma.projects.create({
      data: {
        name: nombre,
        description: descripcion,
        img: imagePath,
      },
    });

    const newMember = await prisma.teamProject.create({
      data: {
        userId: +usuarioId,
        role: "leader",
        projectId: newProject.id,
      },
    });

    res.status(200).json(newProject);
  } catch (error) {
    console.error("Error al crear el proyecto:", error);
    res.status(500).json({ error: "Error al crear el proyecto" });
  }
};

export const addTeamMember = async (req, res) => {
  const { correo, proyectoId } = req.body;
  console.log(req.body);

  if (!correo) {
    return res.status(400).json({ error: "Faltan campos" });
  }

  try {
    const existingUser = await prisma.users.findUnique({
      where: {
        email: correo,
      },
    });

    if (!existingUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const newMember = await prisma.teamProject.create({
      data: {
        userId: existingUser.id,
        role: "member",
        projectId: +proyectoId,
      },
    });

    return res.status(200).json(newMember);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

function formatDateTime(fecha, hora) {
  // Verifica si la fecha y la hora están presentes
  if (!fecha || !hora) {
    throw new Error("La fecha o la hora no están presentes");
  }

  // Combina la fecha y la hora en un solo string en formato ISO-8601
  const dateTimeString = `${fecha}T${hora}:00`;

  // Crea un objeto Date usando el string combinado
  const dateTime = new Date(dateTimeString);

  // Verifica si el objeto Date es válido
  if (isNaN(dateTime.getTime())) {
    throw new Error("Fecha u hora inválida");
  }

  // Devuelve el string en formato ISO-8601
  return dateTime.toISOString();
}

export const createMeeting = async (req, res) => {
  const { fecha, hora, enlace, descripcion, proyectoId, usuarioId } = req.body;
  console.log(req.body);

  try {
    const eventTime = formatDateTime(fecha, hora);

    const newMeeting = await prisma.meetings.create({
      data: {
        id: enlace,
        event_time: fecha,
        projectId: proyectoId,
        authorId: usuarioId,
      },
    });
    return res.status(200).json(newMeeting);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.projects.findMany();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error al obtener los proyectos:", error);
    res.status(500).json({ error: "Error al obtener los proyectos" });
  }
};
