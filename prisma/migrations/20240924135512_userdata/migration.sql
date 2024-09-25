-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "userImage" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "UserCardData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    CONSTRAINT "UserCardData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Refferance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "refferanceAmount" INTEGER NOT NULL,
    "isClaimed" BOOLEAN NOT NULL,
    "previousLig" INTEGER NOT NULL,
    CONSTRAINT "Refferance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DailyCombo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cardIds" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
