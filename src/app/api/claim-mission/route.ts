import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';

export async function POST(req: NextRequest) {
  try {
    const { missionId } = await req.json();

    // Veritabanında ilgili misyonun isClaimed alanını true yap
    await prisma.mission.update({
      where: { id: missionId },
      data: { isClaimed: true },
    });

    return NextResponse.json({ message: 'Görev başarıyla tamamlandı.' });
  } catch (error) {
    console.error('Görev güncellenirken hata oluştu:', error);
    return NextResponse.json({ error: 'Bir hata oluştu.' }, { status: 500 });
  }
}
