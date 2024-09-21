interface LeaderboardEntry {
  id: number;
  name: string;
  coins: number;
  avatar: string;
}

export const leaderboardData: Record<number, LeaderboardEntry[]> = {
  1: [
    { id: 1, name: "rbuivol", coins: 34, avatar: "/api/placeholder/40/40" },
    { id: 2, name: "tgsovkz1", coins: 33.5, avatar: "/api/placeholder/40/40" },
    { id: 3, name: "ley149", coins: 31.7, avatar: "/api/placeholder/40/40" },
    { id: 4, name: "chirus320", coins: 31.1, avatar: "/api/placeholder/40/40" },
    { id: 5, name: "player1", coins: 30, avatar: "/api/placeholder/40/40" },
  ],
  2: [
    { id: 6, name: "player2", coins: 65, avatar: "/api/placeholder/40/40" },
    { id: 7, name: "player3", coins: 63.2, avatar: "/api/placeholder/40/40" },
    { id: 8, name: "player4", coins: 61.8, avatar: "/api/placeholder/40/40" },
    { id: 9, name: "player5", coins: 60.5, avatar: "/api/placeholder/40/40" },
    { id: 10, name: "player6", coins: 59.9, avatar: "/api/placeholder/40/40" },
  ],
  3: [
    { id: 11, name: "pro1", coins: 98.7, avatar: "/api/placeholder/40/40" },
    { id: 12, name: "pro2", coins: 97.5, avatar: "/api/placeholder/40/40" },
    { id: 13, name: "pro3", coins: 96.2, avatar: "/api/placeholder/40/40" },
    { id: 14, name: "pro4", coins: 95.8, avatar: "/api/placeholder/40/40" },
    { id: 15, name: "pro5", coins: 94.6, avatar: "/api/placeholder/40/40" },
  ],
};

