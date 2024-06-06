import { prisma } from "../../config/prisma.js";

export const editUser = async (req, res) => {
  const { nombre, usuarioId } = req.body;
  const imagePath = req.file?.path;

  try {
    const updateData = {
     ...(nombre && { name: nombre }),
     ...(imagePath && { image: imagePath }),
    };

    const updatedProfile = await prisma.users.update({
      where: {
        id: +usuarioId,
      },
      data: updateData,
    });

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error("Error editing profile:", error);
    res.status(500).json({ error: "Error al editar el perfil" });
  }
};
