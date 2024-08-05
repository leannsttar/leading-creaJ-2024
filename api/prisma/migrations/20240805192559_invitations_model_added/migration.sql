-- CreateTable
CREATE TABLE "Invitations" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invitations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invitations_token_key" ON "Invitations"("token");
