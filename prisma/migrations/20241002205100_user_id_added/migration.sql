/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Mission" DROP CONSTRAINT "Mission_userId_fkey";

-- DropForeignKey
ALTER TABLE "Referance" DROP CONSTRAINT "Referance_referenceId_fkey";

-- DropForeignKey
ALTER TABLE "UserCardData" DROP CONSTRAINT "UserCardData_userId_fkey";

-- DropIndex
DROP INDEX "User_id_key";

-- AlterTable
CREATE SEQUENCE user_id_seq;
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq'),
ALTER COLUMN "userId" DROP DEFAULT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE user_id_seq OWNED BY "User"."id";
DROP SEQUENCE "User_userId_seq";

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- AddForeignKey
ALTER TABLE "Mission" ADD CONSTRAINT "Mission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCardData" ADD CONSTRAINT "UserCardData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referance" ADD CONSTRAINT "Referance_referenceId_fkey" FOREIGN KEY ("referenceId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
