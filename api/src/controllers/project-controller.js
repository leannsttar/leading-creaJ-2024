import { prisma } from "../../config/prisma.js";

export const createProject = async (req, res) => {
  const { nombre, descripcion } = req.body;
  const usuarioId = req.usuario.id;
  if (!req.file || !nombre || !descripcion) {
    return res.status(400).json({ error: "Faltan campos" });
  }

  const imagePath = req.file.path;

  try {
    const newProject = await prisma.projects.create({
      data: {
        name: nombre,
        description: descripcion,
        imagen: imagePath,
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
  const { usuarioId } = req.params;

  try {
    const userProjects = await prisma.teamProject.findMany({
      where: {
        userId: +usuarioId,
      },
      include: {
        project: true,
      },
    });

    const projectsWithMembers = await Promise.all(
      userProjects.map(async (userProject) => {
        const project = userProject.project;
        const teamMembers = await prisma.teamProject.findMany({
          where: {
            projectId: project.id,
          },
          include: {
            user: {
              select: { image: true },
            }
          },
        });

        return {
          ...project,
          users: teamMembers.map((teamMember) => teamMember.user),
        };
      })
    );

    res.status(200).json(projectsWithMembers);
  } catch (error) {
    console.error("Error al obtener los proyectos:", error);
    res.status(500).json({ error: "Error al obtener los proyectos" });
  }
};

export const getProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await prisma.projects.findFirst({
      where: {
        id: +id,
      },
      include: {
        team: {
          include: {
            user: {
              select: { id: false, name: false, email: false, image: true } 
            },
          },
        },
      },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const users = project.team.map((teamMember) => teamMember.user);

    const response = {
      ...project,
      users,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error al obtener el proyecto:", error);
    res.status(500).json({ error: "Error al obtener el proyecto" });
  }
};

export const getProjectOverview = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await prisma.projects.findFirst({
      where: {
        id: +id,
      },
      
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Error al obtener el proyecto:", error);
    res.status(500).json({ error: "Error al obtener el proyecto" });
  }
};

export const getProjectConfig = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await prisma.projects.findFirst({
      where: {
        id: +id,
      },
      include: {
        team: {
          include: {
            user: true
          },
        },
      },
    });

    const leader = await prisma.teamProject.findFirst({
      where: {
        projectId: project.id,
        role: 'leader'
      },
      include: {
        user: {
          select: {name: true, image: true}
        }
      }
    })

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const users = project.team.map((teamMember) => teamMember.user);

    const response = {
      ...project, leader, users
    }

    res.status(200).json(response);
  } catch (error) {
    console.error("Error al obtener el proyecto:", error);
    res.status(500).json({ error: "Error al obtener el proyecto" });
  }
};

export const updateProject = async (req, res) => {
  const { nombre, descripcion, id } = req.body;
  const imagePath = req.file?.path; // si req.file no existe, imagePath será undefined

  try {
    const updatedProject = await prisma.projects.update({
      where: {
        id: +id,
      },
      data: {
        name: nombre?? undefined, // si nombre no se envía, se asignará undefined
        description: descripcion?? undefined, // si descripcion no se envía, se asignará undefined
        imagen: imagePath?? undefined, // si imagePath no se envía, se asignará undefined
      },
    });

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error al actualizar el proyecto:", error);
    res.status(500).json({ error: "Error al actualizar el proyecto" });
  }
};