import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/db";

export async function POST(request: NextRequest) {
  let errorMessage = '';
  try {
    const { TelegramUser, startParam } = await request.json();
    console.log('Incoming Telegram User:', TelegramUser); // Gelen Telegram kullanıcısını logla

    const userId = TelegramUser ? TelegramUser.id : 1;
    console.log('User ID determined as:', userId); 
    console.log('request:', request);
    let user ;
    try {
      user = await prisma.user.findFirst({
        where: { id: userId },
      });
    }
    catch (error){ 
      errorMessage = 'Usere girmedi';
      console.log(error);
      if (!user) {
        console.log('User not found, creating new user with ID:', userId); 
        let coin = 0;
        errorMessage = 'usere girdi';
        if (startParam) {
          errorMessage = ' start parama girdi';
          const referrer = await prisma.user.findFirst({
            where: { id: parseInt(startParam) },
          });

          if (referrer) {
            errorMessage =' referrere girdi ';
            console.log('Referrer found with ID:', referrer.id); 
            await prisma.referance.create({
              data: {
                referenceId: referrer.id,
                referencedId: userId,
                referancedName: TelegramUser?.username || "Anonymous",
                referenceAmount: 2500,
                isClaimed: false,
                previousLig: 1,
              },
            });
          } else {
            return NextResponse.json({ message: 'Referrer not found', success: false }, { status: 404 });
          }

          coin = 2500;
        }

        user = await prisma.user.create({
          data: {
            id: userId,
            userName: TelegramUser?.username || "Anonymous",
            userImage: null,
            coins: coin,
            energy: 500,
            energyMax: 500,
            league: 1,
            coinsHourly: 0,
            coinsPerTap: 1,
            lastBoostTime: new Date('2023-01-01T00:00:00Z'),
            dailyBoostCount: 3,
            dailyCardRewardClaimed: false,
            foundCards: "",
            dailyRewardDate: new Date('2023-01-01T00:00:00Z'),
            dailyRewardStreak: 1,
            dailyRewardClaimed: false,
          },
        });
        console.log('New user created with ID:', userId);
      }
      return NextResponse.json({ user, success: true });
    }
    return NextResponse.json({ user, success: true });
  } catch (error) {
    console.error('Error during user creation or fetching:', error);
    return NextResponse.json({ message: `${errorMessage}`, success: false }, { status: 500 });
  }
}

export async function GET() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}
