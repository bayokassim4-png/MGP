-- CreateEnum
CREATE TYPE "Quarter" AS ENUM ('Q1', 'Q2', 'Q3', 'Q4');

-- CreateTable
CREATE TABLE "ptba" (
    "id" UUID NOT NULL,
    "projectId" UUID NOT NULL,
    "componentId" UUID,
    "activityId" UUID,
    "quarter" "Quarter" NOT NULL,
    "responsible" TEXT,
    "plannedBudget" DECIMAL(18,2) NOT NULL,
    "actualBudget" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ptba_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ptba_projectId_idx" ON "ptba"("projectId");

-- CreateIndex
CREATE INDEX "ptba_componentId_idx" ON "ptba"("componentId");

-- CreateIndex
CREATE INDEX "ptba_activityId_idx" ON "ptba"("activityId");

-- AddForeignKey
ALTER TABLE "ptba" ADD CONSTRAINT "ptba_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ptba" ADD CONSTRAINT "ptba_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "components"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ptba" ADD CONSTRAINT "ptba_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
