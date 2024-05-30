/*
  Warnings:

  - You are about to drop the column `img` on the `Projects` table. All the data in the column will be lost.
  - Added the required column `imagen` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "img",
ADD COLUMN     "imagen" TEXT NOT NULL;
