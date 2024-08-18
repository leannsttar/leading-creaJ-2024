-- DropForeignKey
ALTER TABLE "Notifications" DROP CONSTRAINT "Notifications_taskId_fkey";

-- AlterTable
ALTER TABLE "Notifications" ALTER COLUMN "taskId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
