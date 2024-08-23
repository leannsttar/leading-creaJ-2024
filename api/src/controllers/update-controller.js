import dbx from "../../dropboxNew.js";
import { prisma } from "../../config/prisma.js";

export const uploadFile = async (req, res) => {
  try {
    const { taskId } = req.body;
    const fileContent = req.file.buffer;
    const fileName = req.file.originalname;

    const response = await dbx.filesUpload({
      path: `/${fileName}`,
      contents: fileContent,
    });

    const fileRecord = await prisma.files.create({
      data: {
        fileName: fileName,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        url: response.result.path_lower,
        taskId: +taskId,
        authorId: req.usuario.id,
      },
    });

    res.status(200).json({
      message: "Archivo cargado correctamente",
      data: fileRecord,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error al cargar el archivo", error });
  }
};

export const getFilesByTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const files = await prisma.files.findMany({
      where: { taskId: +taskId },
    });

    res.status(200).json(files);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener los archivos", error });
  }
};

export const downloadFile = async (req, res) => {
  try {
    const { fileName } = req.body;

    const url  = await dbx.filesGetTemporaryLink({
      path: "/" + fileName,
    });
    console.log(url);
    res.status(200).json({
      message: "Enlace para descargar el archivo obtenido correctamente",
      downloadLink: url.result.link,
    });
  } catch (error) {
    console.error("Error al obtener el enlace de descarga:", error);

    res.status(500).json({
      message: "Error al obtener el enlace de descarga",
      error: error.message,
    });
  }
};
