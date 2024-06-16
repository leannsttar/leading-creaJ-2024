import { prisma } from "../../config/prisma.js";

export const createProject = async (req, res) => {
  const { nombre, descripcion } = req.body;
  const usuarioId = req.usuario.id;
  if (!req.file || !nombre || !descripcion) {
    return res.status(400).json({ error: "Faltan campos" });
  }

  const imagePath = req.file.path;

  try {
    const result = await prisma.$transaction(async (prisma) => {
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

      return { newProject, newMember };
    });

    res.status(200).json(result);
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

//TODA ESTA PARTE ES EL CONTROLADOR DE LA MEETING
export const createMeeting = async (req, res) => {
  const { fecha, enlace, proyectoId, usuarioId } = req.body;
  console.log(req.body);

  try {
    const newMeeting = await prisma.meetings.create({
      data: {
        id: enlace,
        event_time: new Date(fecha),
        projectId: +proyectoId,
        authorId: +usuarioId,
      },
    });
    return res.status(200).json(newMeeting);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

//tomar las reuniones
export const getMeetings = async (req, res) => {
  try {
    const meetings = await prisma.meetings.findMany({
      include: {
        project: true,
        author: true,
      },
    });

    return res.status(200).json(meetings);
  } catch (error) {
    console.error("Error al obtener las reuniones:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

//AQUÍ DE PROYECTOS

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
              select: { image: true, name: true, id: true },
            },
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
              select: { id: false, name: true, email: false, image: true },
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
            user: true,
          },
        },
      },
    });

    const leader = await prisma.teamProject.findFirst({
      where: {
        projectId: project.id,
        role: "leader",
      },
      include: {
        user: {
          select: { name: true, image: true },
        },
      },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const users = project.team.map((teamMember) => teamMember.user);

    const response = {
      ...project,
      leader,
      users,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error al obtener el proyecto:", error);
    res.status(500).json({ error: "Error al obtener el proyecto" });
  }
};

export const getProjectBoard = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await prisma.projects.findFirst({
      where: {
        id: +id,
      },
      include: {
        team: {
          include: {
            user: true,
          },
        },
        tags: true,
        tasks: {
          include: {
            subTasks: true,
            assignees: true,
            tags: true,
            comments: true,
            files: true,
            links: true,
          },
        },
      },
    });

    res.status(200).json(project);
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
        name: nombre ?? undefined, // si nombre no se envía, se asignará undefined
        description: descripcion ?? undefined, // si descripcion no se envía, se asignará undefined
        imagen: imagePath ?? undefined, // si imagePath no se envía, se asignará undefined
      },
    });

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error al actualizar el proyecto:", error);
    res.status(500).json({ error: "Error al actualizar el proyecto" });
  }
};
