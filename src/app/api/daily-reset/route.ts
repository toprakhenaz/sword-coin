// app/api/daily-reset/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/db';
import { Cards } from '@/data/cardData';

export const revalidate = 0; // Disable ISR, fetch new data on every request

function selectRandomCards(count: number): number[] {
  const shuffled = [...Cards].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(card => card.id);
}

export async function POST(req: Request) {
  try {
    // Verify the cron job secret
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Select 3 random cards for the daily combo
    const dailyCombo = selectRandomCards(3);

    // Update all users
    await prisma.user.updateMany({
      data: {
        foundCards: '',
        dailyCardRewardClaimed: false,
      },
    });

    // Save the new daily combo
    await prisma.dailyCombo.create({
      data: {
        cards: dailyCombo.join(','),
      },
    });

    return NextResponse.json({ message: 'Daily reset completed successfully' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to perform daily reset:", error.message);
      return NextResponse.json({ error: 'Failed to perform daily reset' }, { status: 500 });
    } else {
      console.error("Unknown error occurred during daily reset:", error);
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}