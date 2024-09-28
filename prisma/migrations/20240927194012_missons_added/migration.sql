-- CreateTable
CREATE TABLE "Mission" (
    "id" SERIAL NOT NULL,
    "missionDate" TIMESTAMP(3) NOT NULL,
    "isClaimed" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Mission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Mission" ADD CONSTRAINT "Mission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
