/*
  Warnings:

  - You are about to drop the `Conversation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Conversation";

-- CreateTable
CREATE TABLE "conservations" (
    "id" SERIAL NOT NULL,
    "level" "EnumLevel" NOT NULL,
    "category" TEXT NOT NULL,
    "duration" TEXT,
    "conversation" JSONB NOT NULL,

    CONSTRAINT "conservations_pkey" PRIMARY KEY ("id")
);
