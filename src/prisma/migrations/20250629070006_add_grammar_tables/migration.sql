/*
  Warnings:

  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GrammarPoint` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Example" DROP CONSTRAINT "Example_usageId_fkey";

-- DropForeignKey
ALTER TABLE "Usage" DROP CONSTRAINT "Usage_grammarPointId_fkey";

-- DropTable
DROP TABLE "Example";

-- DropTable
DROP TABLE "GrammarPoint";

-- DropTable
DROP TABLE "Usage";

-- CreateTable
CREATE TABLE "grammars" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "grammars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grammar_usages" (
    "id" SERIAL NOT NULL,
    "structure" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "note" TEXT,
    "grammarId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "grammar_usages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grammar_examples" (
    "id" SERIAL NOT NULL,
    "sentence" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "usageId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "grammar_examples_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "grammar_usages" ADD CONSTRAINT "grammar_usages_grammarId_fkey" FOREIGN KEY ("grammarId") REFERENCES "grammars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grammar_examples" ADD CONSTRAINT "grammar_examples_usageId_fkey" FOREIGN KEY ("usageId") REFERENCES "grammar_usages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
