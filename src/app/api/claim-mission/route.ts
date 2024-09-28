import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';

export async function POST(req: NextRequest) {
  try {
    const { userId, missionDate, isClaimed, coins } = await req.json();

    // Veritabanında yeni bir misyon oluştur
    const newMission = await prisma.mission.create({
      data: {
        userId, 
        missionDate: new Date(missionDate),
        isClaimed: isClaimed || false,
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: {
        coins,
      },
    });


    return NextResponse.json({ message: 'Görev başarıyla oluşturuldu.', newMission });
  } catch (error) {
    console.error('Görev oluşturulurken hata oluştu:', error);
    return NextResponse.json({ error: 'Bir hata oluştu.' }, { status: 500 });
  }
}
