/*
  Warnings:

  - Added the required column `cardId` to the `UserCardData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserCardData" ADD COLUMN     "cardId" INTEGER NOT NULL;
