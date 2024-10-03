import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';

export async function POST(req: NextRequest) {
  try {
    const { userId, coins, dailyRewardStreak, dailyRewardDate, dailyRewardClaimed } = await req.json();

    // Veritabanında günlük ödül güncellemesi
    await prisma.user.update({
      where: { userId: userId },
      data: {
        coins,
        dailyRewardStreak,
        dailyRewardDate: new Date(dailyRewardDate),
        dailyRewardClaimed : dailyRewardClaimed,
      },
    });

    return NextResponse.json({ message: 'Günlük ödül başarıyla alındı.' });
  } catch (error) {
    console.error('Günlük ödül kaydedilirken hata oluştu:', error);
    return NextResponse.json({ error: 'Bir hata oluştu.' }, { status: 500 });
  }
}
