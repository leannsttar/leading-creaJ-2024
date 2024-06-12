-- CreateTable
CREATE TABLE "TasksAssignees" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "TasksAssignees_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TasksAssignees" ADD CONSTRAINT "TasksAssignees_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TasksAssignees" ADD CONSTRAINT "TasksAssignees_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
