/*
  Warnings:

  - Added the required column `img` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "img" TEXT NOT NULL,
ALTER COLUMN "percentage" SET DEFAULT 0;
