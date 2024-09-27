import prisma from "@/db";
import { User, UserCardData } from "@prisma/client";

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

export async function updateFoundCards(userId: number, foundCards: number[]): Promise<User> {
  return prisma.user.update({
    where: { id: userId },
    data: { 
      foundCards: foundCards.join(','),
    },
  });
}

export async function updateUserCoins(userId: number, newCoins: number, newCoinsHourly: number): Promise<User> {
  return prisma.user.update({
    where: { id: userId },
    data: { 
      coins: newCoins,
      coinsHourly: newCoinsHourly,
    },
  });
}

export async function saveUpgrade(userId: number, cardId: number, newLevel: number, newUserCoins: number, newUserCoinsHourly: number): Promise<void> {
  await prisma.$transaction([
    prisma.userCardData.update({
      where: {
        userId_cardId: {
          userId: userId,
          cardId: cardId,
        },
      },
      data: {
        level: newLevel,
      },
    }),
    prisma.user.update({
      where: { id: userId },
      data: {
        coins: newUserCoins,
        coinsHourly: newUserCoinsHourly,
      },
    }),
  ]);
}

/*
export async function getUserWithCards(userId){
  return prisma.user.findUnique({
    where: { id: userId },
    include: { cards: true },
  });
}





*/