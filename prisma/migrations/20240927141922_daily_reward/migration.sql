/*
  Warnings:

  - You are about to drop the column `dailyRewardDay` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastRewardDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `rewardStreak` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "dailyRewardDay",
DROP COLUMN "lastRewardDate",
DROP COLUMN "rewardStreak",
ADD COLUMN     "dailyRewardStreak" INTEGER NOT NULL DEFAULT 1;
