-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "confirmationToken" TEXT,
ADD COLUMN     "confirmed" BOOLEAN NOT NULL DEFAULT false;
