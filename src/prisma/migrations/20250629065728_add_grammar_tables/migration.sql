-- CreateEnum
CREATE TYPE "EnumLevel" AS ENUM ('N5', 'N4', 'N3', 'N2', 'N1');

-- CreateTable
CREATE TABLE "GrammarPoint" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "level" "EnumLevel" NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GrammarPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usage" (
    "id" SERIAL NOT NULL,
    "structure" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "note" TEXT,
    "grammarPointId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Example" (
    "id" SERIAL NOT NULL,
    "sentence" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "usageId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Usage" ADD CONSTRAINT "Usage_grammarPointId_fkey" FOREIGN KEY ("grammarPointId") REFERENCES "GrammarPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Example" ADD CONSTRAINT "Example_usageId_fkey" FOREIGN KEY ("usageId") REFERENCES "Usage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
