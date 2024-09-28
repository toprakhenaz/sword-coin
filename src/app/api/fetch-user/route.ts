// app/api/user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/db";



export async function POST(request: NextRequest) {
  const { TelegramUser } = await request.json();


  const userId = TelegramUser ? TelegramUser.id : 1;
  let user = await prisma.user.findFirst({
    where: { id: userId },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        id: userId,
        userName: TelegramUser?.username || "Anonymous",
        userImage: null,
        coins: 0,
        energy: 500,
        energyMax: 500,
        league: 1,
        coinsHourly: 10,
        coinsPerTap: 1,
        lastBoostTime: new Date('2023-01-01T00:00:00Z'), // Use a specific date in 2023
        dailyBoostCount: 0,
        dailyCardRewardClaimed: false,
        foundCards: "",
        dailyRewardDate: new Date('2023-01-01T00:00:00Z'), // Set a date in 2023
        dailyRewardStreak: 1,
        dailyRewardClaimed: false,
      },
    });
    
  }

  return NextResponse.json(user);
}

export async function GET() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}