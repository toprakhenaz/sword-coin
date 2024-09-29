/*
  Warnings:

  - Added the required column `referancedName` to the `Referance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Referance" ADD COLUMN     "referancedName" TEXT NOT NULL;
