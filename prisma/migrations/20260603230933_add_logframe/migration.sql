-- CreateEnum
CREATE TYPE "LogframeLevel" AS ENUM ('OBJECTIF_GLOBAL', 'OBJECTIF_SPECIFIQUE', 'RESULTAT');

-- CreateTable
CREATE TABLE "logframe" (
    "id" UUID NOT NULL,
    "projectId" UUID NOT NULL,
    "level" "LogframeLevel" NOT NULL,
    "title" TEXT NOT NULL,
    "indicator" TEXT,
    "baseline" TEXT,
    "target" TEXT,
    "verificationSource" TEXT,
    "assumptions" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "logframe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "logframe_projectId_idx" ON "logframe"("projectId");

-- AddForeignKey
ALTER TABLE "logframe" ADD CONSTRAINT "logframe_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
