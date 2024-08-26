import { Server } from "socket.io";
import http from "http";
import { getMessagesByProjectId, saveMessage } from "./src/controllers/message-controller.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // Permitir cualquier origen
      methods: ["GET", "POST"], // Métodos permitidos
    },
  });

  io.on('connection', (socket) => {
    // console.log('New client connected');

    // Unirse a un proyecto
    socket.on('joinProject', async (projectId) => {
      socket.join(projectId.toString());
      // console.log(`Client joined project room: ${projectId}`);
      
      // Cargar mensajes existentes cuando el usuario se una a un proyecto
      const messages = await getMessagesByProjectId(projectId);
      socket.emit('loadMessages', messages);
    });

    // Enviar un mensaje
    socket.on('message', async (message) => {
        try {
            // console.log('Mensaje recibido:', message);
    
            // Guardar mensaje en la base de datos
            const savedMessage = await saveMessage(message);
            // console.log('Mensaje guardado:', savedMessage);
            
            // Enviar el mensaje a todos los miembros del proyecto
            io.to(message.projectId.toString()).emit('message', message);
        } catch (error) {
            console.error('Error handling message:', error);
        }
    });

    // Unir usuario a la room de sus projectos
    socket.on('joinUserProjects', async (userId) => {
      try {
        const userProjects = await prisma.projects.findMany({
          where: {
            team: {
              some: {
                userId: +userId,
              },
            },
          },
        });
        userProjects.forEach((project) => {
          socket.join(project.id.toString());
          // console.log(`Client joined project room: ${project.id}`);
        });
      } catch (err) {
        console.error('Error fetching user projects:', err);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};

export default createSocketServer;