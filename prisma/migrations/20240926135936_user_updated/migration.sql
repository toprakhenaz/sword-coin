-- CreateTable
CREATE TABLE "UserCardData" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "UserCardData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Refferance" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "refferanceAmount" INTEGER NOT NULL,
    "isClaimed" BOOLEAN NOT NULL,
    "previousLig" INTEGER NOT NULL,

    CONSTRAINT "Refferance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "userImage" TEXT,
    "coins" INTEGER NOT NULL,
    "energy" INTEGER NOT NULL,
    "energyMax" INTEGER NOT NULL,
    "league" INTEGER NOT NULL,
    "coinsHourly" INTEGER NOT NULL,
    "coinsPerTap" INTEGER NOT NULL,
    "lastBoostTime" TIMESTAMP(3) NOT NULL,
    "dailyBoostCount" INTEGER NOT NULL,
    "foundCards" TEXT NOT NULL,
    "lastRewardDate" TEXT NOT NULL,
    "rewardStreak" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserCardData" ADD CONSTRAINT "UserCardData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refferance" ADD CONSTRAINT "Refferance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
