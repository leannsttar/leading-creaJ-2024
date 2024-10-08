import { prisma } from "../../config/prisma.js";

//ta malo, ne, igual ni se usa
export const getTasks = async (req, res) => {
  const { id } = req.params;

  try {
    const tasks = await prisma.projects.findMany({
      where: {
        projectId: +id,
      },
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
};

export const getUserTasksCalendar = async (req, res) => {
  const { userId } = req.params;

  try {
    const tasks = await prisma.tasks.findMany({
      where: {
        assignees: {
          some: {
            userId: +userId,
          },
        },
      },
      include: {
        project: true
      }
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
};

//el que se usa xd
export const getUserTasks = async (req, res) => {
  const { userId } = req.params;

  try {
    const tasks = await prisma.tasks.findMany({
      where: {
        assignees: {
          some: {
            userId: +userId,
          },
        },
      },
      include: {
        subTasks: true,
        assignees: true,
        tags: true,
        comments: true,
        files: true,
        links: true,
        project: {
          include: {
            team: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                  },
                },
              },
            },
            tags: true
          },
        },
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
};

export const updateTask = async (req, res) => {
  const { taskId, title, projectId, date, members, tags, description, userId, actionUserName, taskName, assignedUsers } = req.body;
  const assignedArray = JSON.parse(assignedUsers);
  if (!taskId) {
    return res.status(400).json({ error: "El ID de la tarea es requerido" });
  }
  try {
    const updateData = {};
    let editedFields = [];
    if (title !== undefined) {
      updateData.name = title;
      editedFields.push("título");
    }
    if (description !== undefined) {
      updateData.description = description;
      editedFields.push("descripción");
    }
    if (date !== undefined) {
      updateData.due_date = new Date(date);
      editedFields.push("fecha de vencimiento");
    }

    if (Object.keys(updateData).length > 0) {
      await prisma.tasks.update({
        where: { id: +taskId },
        data: updateData,
      });

      // Notificar a los miembros existentes sobre la edición específica
      const editNotificationPromises = assignedArray
        .filter(user => user.id !== +userId)
        .map(user => 
          prisma.notifications.create({
            data: {
              content: `${actionUserName} ha editado ${editedFields.join(", ")} de la tarea "${taskName}"`,
              type: "task_edit",
              taskId: +taskId,
              userId: user.id,
              actionUserId: +userId,
              projectId: +projectId
            },
          })
        );

      await Promise.all(editNotificationPromises);
    }

    if (members) {
      const membersArray = JSON.parse(members);
      
      // Obtener detalles de los miembros desde la base de datos
      const membersDetails = await prisma.users.findMany({
        where: { id: { in: membersArray } },
        select: { id: true, name: true }
      });
    
      const existingMemberIds = assignedArray.map(user => user.id);
    
      for (const newMember of membersDetails) {
        if (!existingMemberIds.includes(newMember.id)) {
          await prisma.tasksAssignees.create({
            data: {
              taskId: +taskId,
              userId: newMember.id,
            },
          });
    
          // Notificar al nuevo miembro
          if (newMember.id !== +userId) {
            await prisma.notifications.create({
              data: {
                content: `${actionUserName} ha agregado a "${newMember.name}" a la tarea "${taskName}"`,
                type: "task_assignment",
                taskId: +taskId,
                userId: newMember.id,
                actionUserId: +userId,
                projectId: +projectId
              },
            });
          }
    
          // Notificar a los miembros existentes sobre el nuevo miembro
          const newMemberNotificationPromises = assignedArray
            .filter(user => user.id !== +userId && user.id !== newMember.id)
            .map(user => 
              prisma.notifications.create({
                data: {
                  content: `${actionUserName} ha agregado a "${newMember.name}" a la tarea "${taskName}"`,
                  type: "new_member_assignment",
                  taskId: +taskId,
                  userId: user.id,
                  actionUserId: +userId,
                  projectId: +projectId
                },
              })
            );
    
          await Promise.all(newMemberNotificationPromises);
        }
      }
    }
    
    

    if (tags) {
      const tagsArray = JSON.parse(tags);
      if (Array.isArray(tagsArray) && tagsArray.length > 0) {
        // Recuperar las etiquetas con sus nombres desde la base de datos
        const tagsWithNames = await prisma.tags.findMany({
          where: { id: { in: tagsArray } },
          select: { id: true, name: true }
        });
    
        await Promise.all(
          tagsWithNames.map((tag) =>
            prisma.taskTags.create({
              data: {
                tagId: tag.id,
                taskId: +taskId,
              },
            })
          )
        );
    
        // Notificar a los miembros sobre las nuevas etiquetas
        const tagNames = tagsWithNames.map(tag => tag.name).join(", ");
        const tagNotificationPromises = assignedArray
          .filter(user => user.id !== +userId)
          .map(user => 
            prisma.notifications.create({
              data: {
                content: `${actionUserName} ha agregado ${tagsWithNames.length === 1 ? 'la etiqueta' : 'las etiquetas'} "${tagNames}" a la tarea "${taskName}"`,
                type: "new_tags",
                taskId: +taskId,
                userId: user.id,
                actionUserId: +userId,
                projectId: +projectId
              },
            })
          );
    
        await Promise.all(tagNotificationPromises);
      }
    }
    

    const updatedTaskWithRelations = await prisma.tasks.findUnique({
      where: { id: +taskId },
      include: {
        assignees: true,
        tags: true,
      },
    });
    res.status(200).json(updatedTaskWithRelations);
  } catch (error) {
    console.error("Error al actualizar la tarea:", error);
    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
};

export const createTag = async (req, res) => {
  const { projectoId, tag } = req.body;

  try {
    const newTag = await prisma.tags.create({
      data: {
        name: tag,
        projectId: +projectoId,
      },
    });

    res.status(200).json(newTag);
  } catch (error) {
    console.error("Error al crear la tag:", error);
    res.status(500).json({ error: "Error al crear la tag" });
  }
};

export const createTask = async (req, res) => {
  const {
    projectId,
    authorId,
    title,
    date,
    members,
    tags,
    description,
    subtasks,
  } = req.body;

  const membersArray = JSON.parse(members);
  const tagsArray = JSON.parse(tags);
  const subtasksArray = subtasks ? JSON.parse(subtasks) : [];

  try {
    await prisma.$transaction(async (prisma) => {
      const newTask = await prisma.tasks.create({
        data: {
          name: title,
          status: "proximo",
          description,
          due_date: new Date(date),
          projectId: +projectId,
          authorId: +authorId,
        },
      });

      await Promise.all(
        membersArray.map(async (memberId) => {
          await prisma.tasksAssignees.create({
            data: {
              taskId: newTask.id,
              userId: memberId,
            },
          });

          // Crear notificación para cada miembro asignado
          if (memberId !== authorId) {
            // Obtener la información del usuario asignado
            const assignedUser = await prisma.users.findUnique({
              where: { id: memberId },
              select: { name: true },
            });

            await prisma.notifications.create({
              data: {
                content: `${assignedUser.name} ha sido asignado a la tarea "${title}"`,
                type: "task_assignment",
                taskId: newTask.id,
                userId: memberId,
                actionUserId: +authorId,
                projectId: +projectId
              },
            });
          }
        })
      );

      await Promise.all(
        tagsArray.map((tag) => {
          return prisma.taskTags.create({
            data: {
              tagId: tag,
              taskId: newTask.id,
            },
          });
        })
      );

      if (subtasks) {
        await Promise.all(
          subtasksArray.map((subtask) => {
            return prisma.subTasks.create({
              data: {
                name: subtask,
                status: "pendiente",
                taskId: newTask.id,
              },
            });
          })
        );
      }

      res.status(200).json(newTask);
    });
  } catch (error) {
    console.error("Error al crear la tag:", error);
    res.status(500).json({ error: "Error al crear la tag" });
  }
};

export const updateSubtaskStatus = async(req, res) => {
  const { taskId, status, userId, projectId, userName, taskName, assignedUsers } = req.body
  const membersArray = JSON.parse(assignedUsers);
  try {
    const updatedSubtask = await prisma.subTasks.update({
      where: {
        id: +taskId
      },
      data: {
        status,
      },
    });

    // Crear notificaciones para todos los usuarios asignados, excepto el que actualizó la subtarea
    const notificationPromises = membersArray
      .filter(user => user.id !== +userId)
      .map(user => 
        prisma.notifications.create({
          data: {
            content: `${userName} ha cambiado el estado de una subtarea en "${taskName}" a ${status}`,
            type: "subtask_status_update",
            userId: user.id,
            actionUserId: +userId,
            projectId: +projectId
          }
        })
      );

    await Promise.all(notificationPromises);

    res.status(200).json(updatedSubtask);
  } catch (error) {
    console.error("Error al actualizar la subtarea:", error);
    res.status(500).json({ error: "Error al actualizar la subtarea" });
  }
}

export const addLinkToTask = async(req, res) => {
  const { taskId, authorId, projectId, link, authorName, taskName, assignedUsers } = req.body

  const membersArray = JSON.parse(assignedUsers);

  try {
    const newLink = await prisma.links.create({
      data: {
        url: link,
        taskId: +taskId,
        authorId: +authorId
      },
    });

    // Crear notificaciones para todos los usuarios asignados, excepto el autor del link
    const notificationPromises = membersArray
      .filter(user => user.id !== +authorId)
      .map(user => 
        prisma.notifications.create({
          data: {
            content: `${authorName} ha agregado un link a la tarea "${taskName}"`,
            type: "new_link",
            userId: user.id,
            actionUserId: +authorId,
            projectId: +projectId
          }
        })
      );

    await Promise.all(notificationPromises);

    res.status(200).json(newLink);
  } catch (error) {
    console.error("Error al agregar el link:", error);
    res.status(500).json({ error: "Error al agregar el link" });
  }
}

export const createComment = async(req, res) => {
  const { taskId, authorId, projectId, comment, authorName, taskName, assignedUsers } = req.body

  const membersArray = JSON.parse(assignedUsers);

  try {
    const newComment = await prisma.comments.create({
      data: {
        content: comment,
        taskId: +taskId,
        authorId: +authorId
      },
    });

    // Crear notificaciones para todos los usuarios asignados, excepto el autor del comentario
    const notificationPromises = membersArray
      .filter(user => user.id !== +authorId)
      .map(user => 
        prisma.notifications.create({
          data: {
            content: `${authorName} ha comentado en la tarea "${taskName}"`,
            type: "new_comment",
            userId: user.id,
            actionUserId: +authorId,
            projectId: +projectId
          }
        })
      );

    await Promise.all(notificationPromises);

    res.status(200).json(newComment);
  } catch (error) {
    console.error("Error al crear el comentario:", error);
    res.status(500).json({ error: "Error al crear el comentario" });
  }
}

//este
export const changeTaskStatus = async (req, res) => {
  const { taskId, status, projectId, userId, actionUserName, taskName, assignedUsers } = req.body;
  
  const membersArray = JSON.parse(assignedUsers);


  try {
    const updatedTask = await prisma.tasks.update({
      where: {
        id: +taskId,
      },
      data: {
        status,
      },
    });

    // Notificar a los otros miembros sobre el cambio de estado
    const notificationPromises = membersArray
      .filter(user => user.id !== +userId)
      .map(user => 
        prisma.notifications.create({
          data: {
            content: `${actionUserName} ha marcado la tarea "${taskName}" como ${status === "terminado" ? "terminada" : "iniciada"}`,
            type: "task_status_change",
            taskId: +taskId,
            userId: user.id,
            actionUserId: +userId,
            projectId: +projectId
          },
        })
      );

    await Promise.all(notificationPromises);

    res.status(200).json(updatedTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al cambiar el estado de la tarea" });
  }
};



export const getFilesByProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const projectIdInt = +projectId;

    const files = await prisma.files.findMany({
      where: {
        task: {
          projectId: +projectId,
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        task: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(200).json({
      message: 'Archivos obtenidos correctamente',
      data: files,
    });
  } catch (error) {
    console.error("Error al obtener los archivos", error);
    res.status(500).json({ message: 'Error al obtener los archivos', error });
  }
};
