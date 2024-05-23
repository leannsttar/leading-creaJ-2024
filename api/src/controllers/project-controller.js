import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const createProject = async (req, res) => {
    // Validate input
  if (!req.file || !req.body.name || !req.body.description) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  // Upload image
  const imageFileName = req.file.filename;
  const imagePath = `uploads/${imageFileName}`;

  // Save data to database
  try {
    // await prisma.image.create({
    //   data: {
    //     path: imagePath,
    //     name: req.body.name,
    //     description: req.body.description,
    //   },
    // });
    res.status(200).json({ message: 'Image data saved successfully' });
  } catch (error) {
    console.error('Error saving image data:', error);
    res.status(500).json({ error: 'Failed to save image data' });
  }
}