/*
  Warnings:

  - A unique constraint covering the columns `[userId,cardId]` on the table `UserCardData` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserCardData_userId_cardId_key" ON "UserCardData"("userId", "cardId");
