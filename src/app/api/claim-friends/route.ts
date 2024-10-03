import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';

export async function POST(req: NextRequest) {
  try {
    const { userId, id, isClaimed, coins } = await req.json();

    // Veritabanında yeni bir misyon oluştur
    const updatedFriend = await prisma.referance.update({
      where: { id: id },
      data: {
        isClaimed : isClaimed,
      },
    });

    await prisma.user.update({
      where: { userId: userId },
      data: {
        coins,
      },
    });


    return NextResponse.json({ message: 'Görev başarıyla oluşturuldu.', updatedFriend });
  } catch (error) {
    console.error('Görev oluşturulurken hata oluştu:', error);
    return NextResponse.json({ error: 'Bir hata oluştu.' }, { status: 500 });
  }
}
