/*
  Warnings:

  - You are about to drop the `Labels` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TaskLabels` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TaskLabels" DROP CONSTRAINT "TaskLabels_labelId_fkey";

-- DropForeignKey
ALTER TABLE "TaskLabels" DROP CONSTRAINT "TaskLabels_taskId_fkey";

-- DropTable
DROP TABLE "Labels";

-- DropTable
DROP TABLE "TaskLabels";

-- CreateTable
CREATE TABLE "Tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskTags" (
    "id" SERIAL NOT NULL,
    "tagId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "TaskTags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TaskTags" ADD CONSTRAINT "TaskTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskTags" ADD CONSTRAINT "TaskTags_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
