import { User } from "@prisma/client";
import axios from "axios";

const date = new Date( 1684275200000);

export const user = {
  userName: 'ali',
  userId: 2,
  coins: 2000000000,
  energy: 200,
  maxEnergy: 500,
  lig: 1,
  hourlyEarn: 200,
  earnPerTap: 3,
  lastBoostTime: date, // or your specific date
  dailyBoostCount: 3,
  cards: [
    { id: 1, level: 2 },
    { id: 3, level: 1 },
  ],
  dailyCombo: [1, 5, 7], // Daily combo card IDs
  foundCards: [], // Found card IDs
  lastRewardDate: '', // Date of the last reward claim
  rewardStreak: 0, // Current streak count
  refferences : []
};

export const ligImage: Record<number | string, string> = {
  1: "/ligImages/wooden-sword.png",       // 1. Seviye: Ahşap Kılıç
  2: "/ligImages/bronze-sword.png",       // 2. Seviye: Bronz Kılıç
  3: "/ligImages/iron-sword.png",         // 3. Seviye: Demir Kılıç
  4: "/ligImages/steel-sword.png",        // 4. Seviye: Çelik Kılıç
  5: "/ligImages/adamantite-sword.png",      // 5. Seviye: Mithril Kılıç
  6: "/ligImages/adamantite-sword.png",   // 6. Seviye: Adamantit Kılıç
  7: "/ligImages/dragon-sword.png",       // 7. Seviye: Ejderha Kılıcı
  8: "/ligImages/legendary-sword.png",    // 8. Seviye: Efsanevi Kılıç
};


export const ligCoin: Record<number, number> = {
  1: 2100,
  2: 2200,
  3: 20000,
  4: 25000,
  5: 50000,
  6: 100000,
  7: 250000,
  8: 1000000
}

export const ligEearningCoin: Record<number, number> = {
  2: 300,
  3: 600,
  4: 900,
  5 : 12000,
  6 : 24000,
  7 : 48000,
  8 : 100000,
}


export const useLeagueData = () => {
  const getLeagueImage = (league: number) => {
    return ligImage[league] || "/default-image.png"; // Fallback if image not found
  };

  const getLeagueColor = (league: number) => {
    // Örnek renk eşlemeleri
    switch (league) {
      case 1:
        return '#8B4513'; // Wooden Sword (brown)
      case 2:
        return '#C0C0C0'; // Bronze Sword (silver)
      case 3:
        return '#FFD700'; // Iron Sword (gold)
      case 4:
        return '#4682B4'; // Steel Sword (blue)
      case 5:
        return '#B22222'; // Mithril Sword (red)
      case 6:
        return '#A0522D'; // Adamantite Sword (sienna)
      case 7:
        return '#FF4500'; // Dragon Sword (orange)
      case 8:
        return '#DAA520'; // Legendary Sword (goldenrod)
      default:
        return '#FFFFFF'; // Default color
    }
  };

  const getLeagueCoin = (league: number) => {
    return ligCoin[league] || 0;
  };


  return { getLeagueImage, getLeagueColor, getLeagueCoin };
};

export const Myusers = [
  {
    userName: 'Ali',
    userId: 1,
    coins: 200,
    energy: 200,
    maxEnergy: 500,
    lig: 1,
    hourlyEarn: 200,
    earnPerTap: 3,
    lastBoostTime: new Date(),
    dailyBoostCount: 3,
    cards: [{ id: 1, level: 2 }, { id: 3, level: 1 }],
    dailyCombo: [1, 5, 7],
    foundCards: [1],
    refferances: [],
  },
  {
    userName: 'Mehmet',
    userId: 2,
    coins: 1500,
    energy: 250,
    maxEnergy: 600,
    lig: 4, // Mehmet lig atladı
    hourlyEarn: 250,
    earnPerTap: 5,
    lastBoostTime: new Date(),
    dailyBoostCount: 2,
    cards: [{ id: 2, level: 1 }],
    dailyCombo: [2, 4, 6],
    foundCards: [],
    refferances: [
      {
        Id: 1,
        refferanceAmount: 0,
        isClaimed: false,
        previousLig: 2, // Son bilinen lig
      },
      {
        Id: 1,
        refferanceAmount: 0,
        isClaimed: false,
        previousLig: 2, // Son bilinen lig
      },
      {
        Id: 1,
        refferanceAmount: 0,
        isClaimed: false,
        previousLig: 2, // Son bilinen lig
      },
      {
        Id: 1,
        refferanceAmount: 0,
        isClaimed: false,
        previousLig: 2, // Son bilinen lig
      },
    ],
  },
]

export const calculateEarningsInterval = (hourlyEarn : number) => {
  let intervalDuration; 
  let earningsPerInterval; 

  if (hourlyEarn >= 9000) {
    intervalDuration = 3000; 
    earningsPerInterval = Math.floor(hourlyEarn / 1200); 
  } else if (hourlyEarn >= 5000) {
    intervalDuration = 5000;
    earningsPerInterval = Math.floor(hourlyEarn / 720); 
  } else if (hourlyEarn >= 1000) {
    intervalDuration = 10000; 
    earningsPerInterval = Math.floor(hourlyEarn / 360);  
  } else {
    intervalDuration = 30000; 
    earningsPerInterval = Math.floor(hourlyEarn / 120);  
  }

  return { intervalDuration, earningsPerInterval };
};

export const saveUserData = async (user: User) => {
  try {
    const userToSave = {
      ...user
    };
    const response = await axios.post('/api/saveUser', userToSave);
    console.log('User data saved successfully', response.data);
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

export const missons = [
    {id: 1 , title: "X'te gemz'i takip et", reward: 10000, link: "https://x.com/gemz" },
    {id: 2, title: "Instagram'da gemz'i takip et", reward: 15000, link: "https://instagram.com/gemz" },
    {id: 3, title: "Discord'a katıl", reward: 20000, link: "https://discord.gg/gemz" },
    {id: 4, title: "Arkadaşını davet et", reward: 25000, link: "https://gemz.app/invite" },
    {id: 5, title: "Gemz uygulamasını değerlendir", reward: 30000, link: "https://play.google.com/store/apps/details?id=com.gemz" },
    {id:6,  title: "Telegram grubuna katıl", reward: 35000, link: "https://t.me/gemz" },
]
