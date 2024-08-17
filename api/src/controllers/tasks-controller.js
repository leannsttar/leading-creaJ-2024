import { prisma } from "../../config/prisma.js";

//ta malo, ne, igual ni se usa
export const getTasks = async (req, res) => {
  const { id } = req.params;

  try {
    const tasks = await prisma.projects.findMany({
      where: {
        projectId: +id,
      }
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
}

export const getUserTasks = async (req, res) => {
  const { userId } = req.params;

  try {
    const tasks = await prisma.tasks.findMany({
      where: {
        assignees:{
          some: {
            userId: +userId
          }
        }
      }
    })

    res.status(200).json(tasks)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error al obtener las tareas" })
  }
}

export const updateTask = async (req, res) => {
  const {
    taskId,
    title,
    date,
    members,
    tags,
    description,
  } = req.body;
  

  console.log(req.body);

  if (!taskId) {
    return res.status(400).json({ error: 'El ID de la tarea es requerido' });
  }

  try {
    const task = await prisma.tasks.findUnique({ where: { id: +taskId } });
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    // Preparar los datos para actualizar
    const updateData = {};

    if (title !== undefined) updateData.name = title;
    if (description !== undefined) updateData.description = description;
    if (date !== undefined) updateData.due_date = new Date(date);

    // Actualizar la tarea solo si hay datos para actualizar
    if (Object.keys(updateData).length > 0) {
      await prisma.tasks.update({
        where: { id: +taskId },
        data: updateData,
      });
    }

    // Añadir nuevos miembros si se proporcionaron
    if (members) {
      const membersArray = JSON.parse(members);
      if (Array.isArray(membersArray) && membersArray.length > 0) {
        await Promise.all(membersArray.map(member => 
          prisma.tasksAssignees.create({
            data: {
              taskId: +taskId,
              userId: member,
            },
          })
        ));
      }
    }

    // Añadir nuevas etiquetas si se proporcionaron
    if (tags) {
      const tagsArray = JSON.parse(tags);
      if (Array.isArray(tagsArray) && tagsArray.length > 0) {
        await Promise.all(tagsArray.map(tag => 
          prisma.taskTags.create({
            data: {
              tagId: tag,
              taskId: +taskId,
            },
          })
        ));
      }
    }

    // Obtener la tarea actualizada con sus relaciones
    const updatedTaskWithRelations = await prisma.tasks.findUnique({
      where: { id: +taskId },
      include: {
        assignees: true,
        tags: true,
      },
    });

    res.status(200).json(updatedTaskWithRelations);
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    res.status(500).json({ error: 'Error al actualizar la tarea' });
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
        membersArray.map((member) => {
          return prisma.tasksAssignees.create({
            data: {
              taskId: newTask.id,
              userId: member,
            },
          });
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
                status: 'pendiente',
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
  const { taskId, status } = req.body
  console.log(req.body)
  try {
    const updatedSubtask = await prisma.subTasks.update({
      where: {
        id: +taskId
      },
      data: {
        status,
      },
    });

    res.status(200).json(updatedSubtask);
  } catch (error) {
    console.error("Error al actualizar la subtarea:", error);
    res.status(500).json({ error: "Error al actualizar la subtarea" });
  }
}

export const addLinkToTask = async(req, res) => {
  const { taskId, authorId, link } = req.body

  try {
    const newLink = await prisma.links.create({
      data: {
        url: link,
        taskId: +taskId,
        authorId: +authorId
      },
    });

    res.status(200).json(newLink);
  } catch (error) {
    console.error("Error al agregar el link:", error);
    res.status(500).json({ error: "Error al agregar el link" });
  }
}

export const createComment = async(req, res) => {
  const { taskId, authorId, comment } = req.body

  try {
    const newComment = await prisma.comments.create({
      data: {
        content: comment,
        taskId: +taskId,
        authorId: +authorId
      },
    });

    res.status(200).json(newComment);
  } catch (error) {
    console.error("Error al crear el comentario:", error);
    res.status(500).json({ error: "Error al crear el comentario" });
  }
}

export const changeTaskStatus = async (req, res) => {
  const { taskId, status } = req.body;

  try {
    const updatedTask = await prisma.tasks.update({
      where: {
        id: +taskId
      },
      data: {
        status
      }
    })

    res.status(200).json(updatedTask)
  } catch (error) {
   console.log(error)
    res.status(500).json({error: "Error al marcar tarea como terminada"})
  }
}