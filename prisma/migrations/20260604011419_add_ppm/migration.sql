-- CreateEnum
CREATE TYPE "ProcurementMethod" AS ENUM ('AOI', 'AON', 'CONSULTANT', 'GRE_A_GRE', 'DEMANDE_COTATION');

-- CreateEnum
CREATE TYPE "ProcurementStatus" AS ENUM ('PLANIFIE', 'EN_COURS', 'ATTRIBUE', 'TERMINE', 'ANNULE');

-- CreateTable
CREATE TABLE "ppm" (
    "id" UUID NOT NULL,
    "projectId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "method" "ProcurementMethod" NOT NULL,
    "estimatedAmount" DECIMAL(18,2) NOT NULL,
    "plannedDate" TIMESTAMP(3),
    "actualDate" TIMESTAMP(3),
    "responsible" TEXT,
    "status" "ProcurementStatus" NOT NULL DEFAULT 'PLANIFIE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ppm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ppm_projectId_idx" ON "ppm"("projectId");

-- AddForeignKey
ALTER TABLE "ppm" ADD CONSTRAINT "ppm_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
