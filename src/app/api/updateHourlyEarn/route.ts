import { NextResponse } from 'next/server';
import prisma from '@/db';

export const revalidate = 0; // ISR devre dışı, her istekte yeni veri çeker

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Sadece coinsHourly alanını güncelleme
    const updatedUser = await prisma.user.update({
      where: { id: body.id },
      data: {
        coins: body.coins,
      },
    });

    console.log(updatedUser);
    return NextResponse.json(updatedUser);

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Başaramadık abi", error.message);
      return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    } else {
      console.log("Başaramadık abi, bilinmeyen hata:", error);
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}
