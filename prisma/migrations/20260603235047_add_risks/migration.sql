-- CreateEnum
CREATE TYPE "RiskStatus" AS ENUM ('OUVERT', 'EN_COURS', 'MAITRISE', 'FERME');

-- CreateTable
CREATE TABLE "risks" (
    "id" UUID NOT NULL,
    "projectId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "probability" INTEGER NOT NULL,
    "impact" INTEGER NOT NULL,
    "criticality" INTEGER NOT NULL,
    "mitigationMeasure" TEXT,
    "owner" TEXT,
    "status" "RiskStatus" NOT NULL DEFAULT 'OUVERT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "risks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "risks_projectId_idx" ON "risks"("projectId");

-- AddForeignKey
ALTER TABLE "risks" ADD CONSTRAINT "risks_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
