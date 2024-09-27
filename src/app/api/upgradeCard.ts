import prisma from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, cardId, newLevel, newUserCoins, newUserCoinsHourly } = req.body;

  if (req.method === "POST") {
    try {
      // Kart seviyesini güncelle
      await prisma.userCardData.update({
        where: {
          userId_cardId: {
            userId: Number(userId),
            cardId: Number(cardId),
          },
        },
        data: { level: newLevel },
      });

      // Kullanıcının coins ve saatlik kazançlarını güncelle
      await prisma.user.update({
        where: { id: Number(userId) },
        data: {
          coins: newUserCoins,
          coinsHourly: newUserCoinsHourly,
        },
      });

      res.status(200).json({ message: "Kart başarıyla yükseltildi!" });
    } catch (error) {
      console.error("Kart yükseltme hatası:", error);
      res.status(500).json({ error: "Bir şeyler yanlış gitti!" });
    }
  } else {
    res.status(405).json({ error: "Yalnızca POST istekleri desteklenir." });
  }
}
