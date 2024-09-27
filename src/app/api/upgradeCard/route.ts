import prisma from "@/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId, cardId, newLevel, newUserCoins, newUserCoinsHourly, newFoundCards, newDailyCardsFound } = await request.json();

    // userId kontrolü
    if (!userId) {
      return NextResponse.json({ error: "User ID eksik!" }, { status: 400 });
    }

    // Kullanıcının kart verilerini al
    const existingUserCard = await prisma.userCardData.findFirst({
      where: {
        userId: userId,
        cardId: cardId,
      },
    });

    // Kart seviyesini güncelle ya da yeni bir kart oluştur
    const userCardUpdate = await prisma.userCardData.upsert({
      where: {
        id: existingUserCard?.id ?? 0, // Eğer kart yoksa 0 kullan
      },
      create: {
        userId: userId,
        cardId: cardId,
        level: newLevel,
      },
      update: {
        level: newLevel,
      },
    });

    // Kullanıcının coins, saatlik kazançlarını ve bulunan kartlarını güncelle
    const userUpdate = await prisma.user.update({
      where: { id: userId },
      data: {
        coins: newUserCoins,
        coinsHourly: newUserCoinsHourly,
        foundCards: newFoundCards,
        dailyCardRewardClaimed : newDailyCardsFound,
      },
    });

    return NextResponse.json({ 
      message: "Kart başarıyla güncellendi!",
      userCardUpdate,
      userUpdate
    });
  } catch (error) {
    console.error("Kart güncelleme hatası:", error);
    return NextResponse.json({ error: "Bir şeyler yanlış gitti!" }, { status: 500 });
  }
}