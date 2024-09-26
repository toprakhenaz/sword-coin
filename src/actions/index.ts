import prisma from "@/db";
import { UserCardData } from "@prisma/client";

export async function updateCardLevel(userId: number, cardId: number, newLevel: number): Promise<UserCardData> {
  return prisma.userCardData.update({
    where: { 
      userId_cardId: {
        userId: userId,
        cardId: cardId,
      },
    },
    data: {
      level: newLevel,
    },
  });
}


/*
export async function getUserWithCards(userId){
  return prisma.user.findUnique({
    where: { id: userId },
    include: { cards: true },
  });
}

export async function updateUserCoins(userId: string, newCoins: number, newCoinsHourly: number){
  return prisma.user.update({
    where: { id: userId },
    data: { 
      coins: newCoins,
      coinsHourly: newCoinsHourly,
    },
  });
}

export async function updateCardLevel(userId: string, cardId: number, newLevel: number): Promise<Card> {
  return prisma.card.update({
    where: { 
      id: cardId,
      userId: userId,
    },
    data: {
      level: newLevel,
    },
  });
}

export async function updateFoundCards(userId: string, foundCards: number[]): Promise<User> {
  return prisma.user.update({
    where: { id: userId },
    data: { 
      foundCards: foundCards.join(','),
    },
  });
}

export async function saveUpgrade(userId: string, cardId: number, newLevel: number, newUpgradeCost: number, newHourlyIncome: number, newUserCoins: number, newUserCoinsHourly: number): Promise<void> {
  await prisma.$transaction([
    updateCardLevel(userId, cardId, newLevel, newUpgradeCost, newHourlyIncome),
    updateUserCoins(userId, newUserCoins, newUserCoinsHourly),
  ]);
}
*/