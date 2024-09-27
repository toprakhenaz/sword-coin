-- CreateTable
CREATE TABLE "DailyCombo" (
    "id" SERIAL NOT NULL,
    "cards" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyCombo_pkey" PRIMARY KEY ("id")
);
