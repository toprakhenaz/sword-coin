/*
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const user = {
        userName: 'Einstein',
        userImage: 'https://www.zegem.com/upload/einstein-241x300.jpg',
        coins: 2000,
        energy: 100,
        energyMax: 1000,
        league: 1,
        coinsHourly: 300,
        coinsPerTap: 10,
        lastBoostTime: new Date(),
        dailyBoostCount: 1,
        foundCards: '', // Diziyi string olarak sakla
      };

      const newUser = await prisma.user.create({
        data: {
          userName: user.userName,
          userImage: user.userImage,
          coins: user.coins,
          energy: user.energy,
          energyMax: user.energyMax,
          league: user.league,
          coinsHourly: user.coinsHourly,
          coinsPerTap: user.coinsPerTap,
          lastBoostTime: user.lastBoostTime,
          dailyBoostCount: user.dailyBoostCount,
          foundCards: user.foundCards,
          lastRewardDate : `${Date.now()}`,
          cards: {
            create: []
          },
          refferances: {
            create: []
          }
        },
      });

      res.status(201).json({ message: 'User created', newUser });
    } catch (error) {
      res.status(500).json({ error: 'Error creating user', details: error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}


console.log('User created');
*/