import { prisma } from "../../config/prisma.js";
import { processImage } from "../../uploadImage.js";
import cloudinary from "../../cloudinaryConfig.js";

export const createProject = async (req, res) => {
  const { nombre, descripcion } = req.body;
  const usuarioId = req.usuario.id;
  if (!req.file || !nombre || !descripcion) {
    return res.status(400).json({ error: "Faltan campos" });
  }

  const imagePath = req.file.path;
  const imageUrl = await processImage(imagePath);

  try {
    const result = await prisma.$transaction(async (prisma) => {
      const newProject = await prisma.projects.create({
        data: {
          name: nombre,
          description: descripcion,
          imagen: imageUrl,
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
  const { id } = req.params;

  try {
    const meetings = await prisma.meetings.findMany({
      where: {
        projectId: +id,
      },
      include: {
        project: true,
        author: true,
        attendance: {
          include: {
            user: true,
          },
        },
      },
      orderBy: { event_time: "asc" },
    });

    const currentDate = new Date();

    // reuniones pasadas y próximas
    const pastMeetings = meetings.filter(
      (meeting) => new Date(meeting.event_time) < currentDate
    );
    const upcomingMeetings = meetings.filter(
      (meeting) => new Date(meeting.event_time) >= currentDate
    );

    return res.status(200).json({
      totalMeetings: meetings.length,
      pastMeetings: pastMeetings.length,
      upcomingMeetings: upcomingMeetings.length,
      meetings,
    });
  } catch (error) {
    console.error("Error al obtener las reuniones:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
export const confirmAttendance = async (req, res) => {
  const { meetingId, userId } = req.body;
  console.log;

  try {
    const existingAttendance = await prisma.meetingsAttendance.findFirst({
      where: {
        meetingId: meetingId,
        userId: +userId,
      },
    });

    if (existingAttendance) {
      return res.status(400).json({ error: "Asistencia ya confirmada" });
    }

    const attendance = await prisma.meetingsAttendance.create({
      data: {
        meetingId: meetingId,
        userId: +userId,
      },
    });
    return res.status(200).json(attendance);
  } catch (error) {
    console.error("Error al confirmar asistencia:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

//AQUÍ DE PROYECTOS
export const getProjectInvitations = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res
        .status(400)
        .json({ message: "El ID del proyecto es requerido." });
    }

    const invitations = await prisma.invitations.findMany({
      where: {
        projectId: parseInt(projectId),
      },
    });

    if (!invitations.length) {
      return res
        .status(404)
        .json({
          message: "No se encontraron invitaciones para este proyecto.",
        });
    }

    return res.status(200).json(invitations);
  } catch (error) {
    console.error("Error al obtener las invitaciones del proyecto:", error);
    return res
      .status(500)
      .json({ message: "Error al obtener las invitaciones del proyecto." });
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
              select: { image: true, name: true, id: true, email: true },
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
  console.log(req.params);
  try {
    const project = await prisma.projects.findFirst({
      where: { id: +id },
      include: {
        team: {
          include: { user: true },
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
            creator: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
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
  const imagePath = req.file?.path;

  let dataToUpdate = {};
  let oldImagePublicId;

  if (nombre !== undefined) {
    dataToUpdate.name = nombre;
  }

  if (descripcion !== undefined) {
    dataToUpdate.description = descripcion;
  }

  if (imagePath) {
    const imageUrl = await processImage(imagePath);
    dataToUpdate.imagen = imageUrl;

    const currentProject = await prisma.projects.findUnique({
      where: { id: +id },
      select: { imagen: true },
    });

    if (currentProject?.imagen) {
      const urlParts = currentProject.imagen.split("/");
      const publicIdWithExtension = urlParts[urlParts.length - 1];
      const publicId = publicIdWithExtension.split(".")[0];
      oldImagePublicId = publicId;
    }
  }

  try {
    const updatedProject = await prisma.projects.update({
      where: {
        id: +id,
      },
      data: dataToUpdate,
    });

    if (oldImagePublicId) {
      await cloudinary.uploader.destroy(oldImagePublicId, (error, result) => {
        if (error) {
          console.error("Error deleting old image:", error);
        } else {
          console.log("Old image deleted:", result);
        }
      });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error al actualizar el proyecto:", error);
    res.status(500).json({ error: "Error al actualizar el proyecto" });
  }
};
