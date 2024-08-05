/*
  Warnings:

  - The primary key for the `Invitations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `token` on the `Invitations` table. All the data in the column will be lost.
  - Added the required column `expirationDate` to the `Invitations` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Invitations_token_key";

-- AlterTable
ALTER TABLE "Invitations" DROP CONSTRAINT "Invitations_pkey",
DROP COLUMN "token",
ADD COLUMN     "expirationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Invitations_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Invitations_id_seq";

-- AddForeignKey
ALTER TABLE "Invitations" ADD CONSTRAINT "Invitations_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
