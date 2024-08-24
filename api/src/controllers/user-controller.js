import { prisma } from "../../config/prisma.js";
import { processImage } from "../../uploadImage.js";
import cloudinary from "../../cloudinaryConfig.js";


export const editUser = async (req, res) => {
  const { nombre, usuarioId } = req.body;
  const imagePath = req.file?.path;

  console.log(usuarioId)
  try {
    let imageUrl;
    let oldImagePublicId;

    const currentProfile = await prisma.users.findUnique({
      where: { id: +usuarioId },
      select: { image: true },
    });

    if (imagePath) {
      imageUrl = await processImage(imagePath);

      if (currentProfile?.image && currentProfile.image ==! "https://res.cloudinary.com/dv79d6y4e/image/upload/f_auto,q_auto/avatarDefault") {

        const urlParts = currentProfile.image.split('/');
        const publicIdWithExtension = urlParts[urlParts.length - 1];
        const publicId = publicIdWithExtension.split('.')[0];
        oldImagePublicId = publicId;
      }
    }

    const updateData = {
      ...(nombre && { name: nombre }),
      ...(imageUrl && { image: imageUrl }),
    };

    const updatedProfile = await prisma.users.update({
      where: {
        id: +usuarioId,
      },
      data: updateData,
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

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error("Error editing profile:", error);
    res.status(500).json({ error: "Error al editar el perfil" });
  }
};
