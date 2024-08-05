import { PrismaClient } from "@prisma/client";
import path from 'path';

const prisma = new PrismaClient();

export const confirmEmail = async (req, res) => {
  const { token } = req.query;
  console.log(req.query);
  
  try {
    const user = await prisma.users.updateMany({
      where: { confirmationToken: token },
      data: { confirmed: true, confirmationToken: null },
    });

    if (user.count === 0) {
      return res.status(400).json({ message: "Token inválido" });
    }

    res.status(200).json({ message: "Correo confirmado con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al confirmar el correo" });
    console.log(error);
  }
};
