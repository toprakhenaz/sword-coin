/*
  Warnings:

  - You are about to drop the `Refferance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Refferance" DROP CONSTRAINT "Refferance_userId_fkey";

-- DropTable
DROP TABLE "Refferance";

-- CreateTable
CREATE TABLE "Referance" (
    "id" SERIAL NOT NULL,
    "referenceId" INTEGER NOT NULL,
    "referencedId" INTEGER NOT NULL,
    "referanceAmount" INTEGER NOT NULL,
    "isClaimed" BOOLEAN NOT NULL,
    "previousLig" INTEGER NOT NULL,

    CONSTRAINT "Referance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Referance" ADD CONSTRAINT "Referance_referenceId_fkey" FOREIGN KEY ("referenceId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
