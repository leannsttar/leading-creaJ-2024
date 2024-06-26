import jwt from 'jsonwebtoken'
import {prisma} from '../config/prisma.js'

export const auth = async (req, res, next) => {

    try {
      const autorizacion = req.headers.authorization;
      if (autorizacion && autorizacion.startsWith("Bearer ")) {

        const token = autorizacion.split(" ")[1];
        const credenciales = jwt.verify(token, "secret-key");
        console.log(credenciales);
        let usuarioEncontrado = await prisma.users.findFirst({
          where: {
            id: credenciales.userId,
          },
        });
        if (!usuarioEncontrado.id) {
          return res.status(400).json({
            message: "Usuario o contraseña no son los correctos",
          });
        }

        req.usuario = usuarioEncontrado;
        next();
      } else {
        return res.status(403).json({
          message: "No estás autenticado",
        });
      }
    } catch (error) {
      console.log(error);

      return res.status(403).json({
        message: "No estás autenticado",
      });
    }
};

export const perfil = async(req,res)=>{
  return res.status(200).json(req.usuario);
}