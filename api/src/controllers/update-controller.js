import dbx from "../../dropboxNew.js";

export const uploadFile = async (req, res) => {
    try {
      const fileContent = req.file.buffer;
      const fileName = req.file.originalname;
  
      const response = await dbx.filesUpload({
        path: `/${fileName}`,
        contents: fileContent,
      });
  console.log(response);
  
      res.status(200).json({
        message: 'Archivo cargado correctamente',
        data: response,
      });
    } catch (error) {
      console.log(error);
  
      res.status(500).json({ message: 'Error al cargar el archivo', error });
    }
  };