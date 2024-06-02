/*
  Warnings:

  - Added the required column `role` to the `TeamProject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeamProject" ADD COLUMN     "role" TEXT NOT NULL;
