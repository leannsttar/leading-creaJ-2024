import { prisma } from "../../config/prisma.js";
import { processImage } from "../../uploadImage.js";
import cloudinary from "../../cloudinaryConfig.js";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// export const addTeamMember = async (req, res) => {
//   const { correo, proyectoId } = req.body;

//   if (!correo || !proyectoId) {
//     return res.status(400).json({ error: "Faltan campos" });
//   }

//   try {
//     const existingUser = await prisma.users.findUnique({
//       where: {
//         email: correo,
//       },
//     });

//     if (!existingUser) {
//       return res.status(404).json({ error: "Usuario no encontrado" });
//     }

//     const invitation = await prisma.invitations.create({
//       data: {
//         id: uuidv4(),
//         email: correo,
//         projectId: +proyectoId,
//         expirationDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: correo,
//       subject: "Invitación a un proyecto",
//       text: `Has sido invitado a unirte al proyecto. Por favor, acepta la invitación a través del siguiente enlace: ${process.env.FRONTEND_URL}/acceptInvitation/${invitation.id}`,
//     };

//     await transporter.sendMail(mailOptions);

//     return res
//       .status(200)
//       .json({ message: "Invitación enviada correctamente" });
//   } catch (error) {
//     console.error("Error:", error);
//     return res.status(500).json({ error: "Error interno del servidor" });
//   }
// };

export const addTeamMember = async (req, res) => {
  const { correo, proyectoId, userId } = req.body;

  if (!correo || !proyectoId || !userId) {
    return res.status(400).json({ error: "Faltan campos" });
  }

  try {
    const existingUser = await prisma.users.findUnique({
      where: { email: correo },
    });

    if (!existingUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const invitation = await prisma.invitations.create({
      data: {
        id: uuidv4(),
        email: correo,
        projectId: +proyectoId,
        expirationDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    const inviter = await prisma.users.findUnique({
      where: { id: +userId },
      select: { name: true, id: true },
    });

    const project = await prisma.projects.findUnique({
      where: { id: +proyectoId },
      select: { name: true },
    });

    const teamMembers = await prisma.teamProject.findMany({
      where: { projectId: +proyectoId },
      select: { userId: true },
    });

    for (const member of teamMembers) {
      if (member.userId != userId) {
        console.log('yess')
        await prisma.notifications.create({
          data: {
            content: `${inviter.name} ha invitado a ${correo} al proyecto "${project.name}"`,
            type: "project_invitation",
            userId: member.userId,
            actionUserId: +inviter.id
            // Ya no es necesario incluir la conexión con la tarea
          },
        });
      }
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: correo,
      subject: "Invitación a un proyecto",
      text: `Has sido invitado a unirte al proyecto. Por favor, acepta la invitación a través del siguiente enlace: ${process.env.FRONTEND_URL}/acceptInvitation/${invitation.id}`,
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ message: "Invitación enviada correctamente" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const acceptInvitation = async (req, res) => {
  const { id } = req.params;

  try {
    const invitation = await prisma.invitations.findUnique({
      where: { id: id },
    });

    if (!invitation) {
      return res.status(404).json({ error: "Invitación no encontrada" });
    }

    if (invitation.expirationDate < new Date()) {
      return res.status(400).json({ error: "La invitación ha expirado" });
    }

    const existingMember = await prisma.teamProject.findFirst({
      where: {
        user: { email: invitation.email },
        projectId: invitation.projectId,
      },
    });

    if (existingMember) {
      return res
        .status(400)
        .json({ message: "El usuario ya es miembro del proyecto" });
    }

    const user = await prisma.users.findUnique({
      where: { email: invitation.email },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await prisma.teamProject.create({
      data: {
        userId: user.id,
        role: "member",
        projectId: invitation.projectId,
      },
    });

    await prisma.invitations.update({
      where: { id: id },
      data: { status: "accepted" },
    });

    const project = await prisma.projects.findUnique({
      where: { id: invitation.projectId },
      select: { name: true },
    });

    const teamMembers = await prisma.teamProject.findMany({
      where: { projectId: invitation.projectId },
      select: { userId: true },
    });

    for (const member of teamMembers) {
      if (member.userId !== user.id) {
        await prisma.notifications.create({
          data: {
            content: `${user.name} ha aceptado la invitación al proyecto "${project.name}"`,
            type: "invitation_accepted",
            userId: member.userId,
            actionUserId: +user.id
            // Ya no es necesario incluir la conexión con la tarea
          },
        });
      }
    }

    return res.status(200).json({ message: "Invitación aceptada" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

// export const addTeamMember = async (req, res) => {
//   const { correo, proyectoId } = req.body;
//   console.log(req.body);

//   if (!correo) {
//       return res.status(400).json({ error: "Faltan campos" });
//   }

//   try {
//       const existingUser = await prisma.users.findUnique({
//           where: {
//               email: correo,
//           },
//       });

//       if (!existingUser) {
//           return res.status(404).json({ error: "Usuario no encontrado" });
//       }

//       const newMember = await prisma.teamProject.create({
//           data: {
//               userId: existingUser.id,
//               role: "member",
//               projectId: +proyectoId,
//           },
//       });

//       // Emit event to join the project room
//       // req.io.to(existingUser.id).emit('joinProject', proyectoId);

//       return res.status(200).json(newMember);
//   } catch (error) {
//       console.error("Error:", error);
//       return res.status(500).json({ error: "Error interno del servidor" });
//   }
// };
