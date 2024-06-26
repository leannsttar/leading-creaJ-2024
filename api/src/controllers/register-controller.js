import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        image: 'https://res.cloudinary.com/dv79d6y4e/image/upload/f_auto,q_auto/avatarDefault'
      },
    });
    res.status(201).json({ message: 'Usuario creado' });
  } catch (error) {
    res.status(400).json({ error: 'Algo pasó' });
    console.log(error)
  }
};
