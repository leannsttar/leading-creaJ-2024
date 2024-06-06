import { prisma } from "../../config/prisma.js";

export const editUser = async (req, res) => {
  const { nombre, usuarioId } = req.body;

  try {
    let updatedProfile;

    if (req.file && nombre) {
      const imagePath = req.file.path;
      updatedProfile = await prisma.users.update({
        where: {
          id: +usuarioId,
        },
        data: {
          name: nombre,
          image: imagePath,
        },
      });
    } else if (req.file) {
      const imagePath = req.file.path;
      updatedProfile = await prisma.users.update({
        where: {
          id: +usuarioId,
        },
        data: {
          image: imagePath,
        },
      });
    } else {
      updatedProfile = await prisma.users.update({
        where: {
          id: +usuarioId,
        },
        data: {
          name: nombre,
        },
      });
    }

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error("Error editing profile:", error);
    res.status(500).json({ error: "Error al editar el perfil" });
  }
};
