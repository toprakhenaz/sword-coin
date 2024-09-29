/*
  Warnings:

  - You are about to drop the column `referanceAmount` on the `Referance` table. All the data in the column will be lost.
  - Added the required column `referenceAmount` to the `Referance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Referance" DROP COLUMN "referanceAmount",
ADD COLUMN     "referenceAmount" INTEGER NOT NULL;
