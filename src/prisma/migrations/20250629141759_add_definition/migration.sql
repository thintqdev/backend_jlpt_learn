/*
  Warnings:

  - Added the required column `definition` to the `grammars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "grammars" ADD COLUMN     "definition" TEXT NOT NULL;
