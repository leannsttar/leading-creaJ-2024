/*
  Warnings:

  - Added the required column `status` to the `SubTasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubTasks" ADD COLUMN     "status" TEXT NOT NULL;
