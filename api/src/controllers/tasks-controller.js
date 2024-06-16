import { prisma } from "../../config/prisma.js";

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
  const subtasksArray = JSON.parse(subtasks);

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
