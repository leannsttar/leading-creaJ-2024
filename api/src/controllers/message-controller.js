import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const saveMessage = async (message) => {
  try {
    const newMessage = await prisma.messages.create({
      data: {
        content: message.content,
        senderId: message.sender.id,
        projectId: message.projectId,
      },
    });
    return newMessage;
  } catch (error) {
    console.error('Error saving message:', error);
    throw error;
  }
};

const getMessagesByProjectId = async (projectId) => {
  try {
    const messages = await prisma.messages.findMany({
      where: { projectId },
      include: {
        sender: true, 
      },
      orderBy: {
        sentAt: 'asc',
      },
    });
    return messages;
  } catch (error) {
    console.error('Error retrieving messages:', error);
    throw error;
  }
};

export { saveMessage, getMessagesByProjectId };