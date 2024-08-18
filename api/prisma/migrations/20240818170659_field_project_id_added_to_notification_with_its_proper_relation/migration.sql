-- AlterTable
ALTER TABLE "Notifications" ADD COLUMN     "projectId" INTEGER;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;
