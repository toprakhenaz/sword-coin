export const ligImage : Record<number | string,string> = {
  1 : "/wooden-sword.png",
  2 : "/steel-sword.png",
  3 : "/cartoon.png",
  4 : "/steel-sword.png",
}

export const ligCoin: Record<number, number> = {
  1: 2100,
  2: 2200,
  3: 20000,
}

export const ligEearningCoin: Record<number, number> = {
  2: 300,
  3: 600,
  4: 900,
}

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
};



export const useLeagueData = () => {
  const getLeagueImage = (league: number) => {
    return ligImage[league] || "/default-image.png"; // Fallback if image not found
  };

  const getLeagueColor = (league: number) => {
    // Example color mapping for different leagues
    switch (league) {
      case 1:
        return '#8B4513'; // Wooden Sword (brown)
      case 2:
        return '#C0C0C0'; // Steel Sword (silver)
      case 3:
        return '#FFD700'; // Cartoon (gold)
      case 4:
        return '#4682B4'; // Steel Sword (blue)
      default:
        return '#FFFFFF'; // Default color
    }
  };

  const getLeagueCoin = (league: number) => {
    return ligCoin[league] || 0;
  };


  return { getLeagueImage, getLeagueColor, getLeagueCoin };
};
