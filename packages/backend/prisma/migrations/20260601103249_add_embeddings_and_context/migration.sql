-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "embedding" JSONB,
ADD COLUMN     "embeddingVersion" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "response_contexts" (
    "id" TEXT NOT NULL,
    "responseId" TEXT NOT NULL,
    "strengths" TEXT[],
    "weaknesses" TEXT[],
    "keywords" TEXT[],
    "conceptsMatched" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "response_contexts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "response_contexts_responseId_key" ON "response_contexts"("responseId");

-- CreateIndex
CREATE INDEX "response_contexts_responseId_idx" ON "response_contexts"("responseId");

-- AddForeignKey
ALTER TABLE "response_contexts" ADD CONSTRAINT "response_contexts_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "responses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
