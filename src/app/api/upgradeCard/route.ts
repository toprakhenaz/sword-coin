import prisma from "@/db";
import { NextResponse } from "next/server";

// POST /api/upgradeCard
export async function POST(request: Request) {
  try {
    const { userId, cardId, newLevel, newUserCoins, newUserCoinsHourly, foundCards } = await request.json();

    // Kart seviyesini güncelle
    await prisma.userCardData.update({
      where: {
        userId_cardId: {
          userId: userId,
          cardId: cardId,
        },
      },
      data: { level: newLevel },
    });

    // Kullanıcının coins ve saatlik kazançlarını güncelle
    await prisma.user.update({
      where: { id: userId },
      data: {
        coins: newUserCoins,
        coinsHourly: newUserCoinsHourly,
        foundCards : foundCards,
      },
    });

    return NextResponse.json({ message: "Kart başarıyla yükseltildi!" });
  } catch (error) {
    console.error("Kart yükseltme hatası:", error);
    return NextResponse.json({ error: "Bir şeyler yanlış gitti!" }, { status: 500 });
  }
}
