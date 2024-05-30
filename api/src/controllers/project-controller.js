import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createProject = async (req, res) => {
  const { nombre, descripcion } = req.body;

  if (!req.file || !nombre || !descripcion) {
    return res.status(400).json({ error: 'Faltan campos' });
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

    res.status(200).json(newProject);
  } catch (error) {
    console.error('Error al crear el proyecto:', error);
    res.status(500).json({ error: 'Error al crear el proyecto' });
  }
};
