/*
  Warnings:

  - You are about to drop the `DailyCombo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DailyCombo";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "userImage" TEXT,
    "coins" INTEGER NOT NULL,
    "energy" INTEGER NOT NULL,
    "energyMax" INTEGER NOT NULL,
    "league" INTEGER NOT NULL,
    "coinsHourly" INTEGER NOT NULL,
    "coinsPerTap" INTEGER NOT NULL,
    "lastBoostTime" DATETIME NOT NULL,
    "dailyBoostCount" INTEGER NOT NULL,
    "foundCards" TEXT NOT NULL
);
INSERT INTO "new_User" ("coins", "coinsHourly", "coinsPerTap", "dailyBoostCount", "energy", "energyMax", "foundCards", "id", "lastBoostTime", "league", "userImage", "userName") SELECT "coins", "coinsHourly", "coinsPerTap", "dailyBoostCount", "energy", "energyMax", "foundCards", "id", "lastBoostTime", "league", "userImage", "userName" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
