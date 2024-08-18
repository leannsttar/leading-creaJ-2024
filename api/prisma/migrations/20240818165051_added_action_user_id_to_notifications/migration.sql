/*
  Warnings:

  - Added the required column `actionUserId` to the `Notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notifications" ADD COLUMN     "actionUserId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_actionUserId_fkey" FOREIGN KEY ("actionUserId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
