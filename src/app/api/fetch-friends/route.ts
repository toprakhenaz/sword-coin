// app/api/user-missions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/db";

export async function POST(request: NextRequest) {
  const { userId } = await request.json();

  try {
    const data = await prisma.user.findUnique({
      where: { userId: userId },
      include: {
        referances: {
          select: {
            id: true,
            previousLig : true,
            referancedName: true,
            referencedId: true, 
            referenceId: true,
            referenceAmount : true,
            isClaimed: true,
          },
        }
      },
    });

    if (!data) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}