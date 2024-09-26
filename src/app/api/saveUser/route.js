import { NextResponse } from 'next/server';
import prisma from '@/db'; 

export const revalidate = 0; // ISR devre dışı, her istekte yeni veri çeker

export async function POST(req) {
  try {
    const body = await req.json();

    // Use Prisma to save the user data
    const updatedUser = await prisma.user.update({
      where: { id: body.id },
      data: {
        userName: body.userName,
        userImage: body.userImage,
        coins: body.coins,
        energy: body.energy,
        energyMax: body.energyMax,
        league: body.league,
        coinsHourly: body.coinsHourly,
        coinsPerTap: body.coinsPerTap,
        lastBoostTime: body.lastBoostTime,
        dailyBoostCount: body.dailyBoostCount,
        foundCards: body.foundCards,
      },
    });
    console.log(updatedUser);
    return NextResponse.json(updatedUser);

  } catch (error) {  // Error type is unknown by default
    if (error instanceof Error) {
      console.log("Başaramadık abi", error.message);
      return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    } else {
      console.log("Başaramadık abi, bilinmeyen hata:", error);
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}