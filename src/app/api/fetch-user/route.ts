// app/api/user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/db";

export async function POST(request: NextRequest) {
  const { TelegramUser, startParam } = await request.json();

  // Telegram kullanıcı kimliğini al, yoksa varsayılan olarak id 1'i kullan
  const userId = TelegramUser ? TelegramUser.id : 1;

  // Sistemde kullanıcıyı bulmaya çalış
  let user = await prisma.user.findFirst({
    where: { id: userId },
  });

  // Eğer kullanıcı yoksa yeni bir kullanıcı oluştur
  if (!user) {
    let coin = 0;
    if (startParam) {
      // Start parametre referansı var ise, referans eden kullanıcıya 2500 coin ekle
      const referrer = await prisma.user.findFirst({
        where: { id: parseInt(startParam) },
      });

      if (referrer) {
        // Referans kaydı ekle
        await prisma.refferance.create({
          data: {
            userId: referrer.id,
            refferanceAmount: 2500,  // Bu, referans edilen kişiye verilecek coin miktarı
            isClaimed: false,  // Henüz talep edilmediği için false
            previousLig: referrer.league,  // Lig durumu kaydediliyor
          },
        });

      }

      coin = 2500; // Yeni kullanıcıya başlangıçta 2500 coin ver
    }

    // Yeni kullanıcıyı oluştur
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
        lastBoostTime: new Date('2023-01-01T00:00:00Z'), // 2023'ten belirli bir tarih kullan
        dailyBoostCount: 3,
        dailyCardRewardClaimed: false,
        foundCards: "",
        dailyRewardDate: new Date('2023-01-01T00:00:00Z'), // 2023'ten bir tarih ayarla
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
