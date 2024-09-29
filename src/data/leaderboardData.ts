interface LeaderboardEntry {
  id: number;
  name: string;
  coins: number;
  avatar: string;
}

const avatars = [
  "/user/pp1.png",
  "/user/pp2.png",
  "/user/pp3.png",
  "/user/pp4.png",
  "/user/pp5.png",
  "/user/pp6.png",
  "/user/pp7.png",
  "/user/pp8.png",
  "/user/pp9.png",
  "/user/pp10.png",
  "/user/pp11.png",
  "/user/pp12.png",
  "/user/pp13.png",
  "/user/pp14.png",
  "/user/pp15.png",
  "/user/pp16.png",
];


export const leaderboardData: Record<number, LeaderboardEntry[]> ={

    1: [
      { id: 1, name: "rbuivol", coins: 34, avatar: "/user.png" },
      { id: 2, name: "tgsovkz1", coins: 33.5, avatar: "/ruby-man.png" },
      { id: 3, name: "ley149", coins: 31.7, avatar: "/user/pp1.png" },
      { id: 4, name: "chirus320", coins: 31.1, avatar: "/user/pp2.png" },
      { id: 5, name: "player1", coins: 30, avatar: "/user/pp3.png" },
    ],  
    
      2: [
        { id: 6, name: "player2", coins: 65, avatar: "/user/pp1.png" },
        { id: 7, name: "player3", coins: 63.2, avatar: "/user/pp2.png" },
        { id: 8, name: "player4", coins: 61.8, avatar: "/user/pp3.png" },
        { id: 9, name: "player5", coins: 60.5, avatar: "/user/pp4.png" },
        { id: 10, name: "player6", coins: 59.9, avatar: "/user/pp5.png" },
      ],
      3: [
        { id: 11, name: "pro1", coins: 98.7, avatar: "/user/pp6.png" },
        { id: 12, name: "pro2", coins: 97.5, avatar: "/user/pp7.png" },
        { id: 13, name: "pro3", coins: 96.2, avatar: "/user/pp8.png" },
        { id: 14, name: "pro4", coins: 95.8, avatar: "/user/pp9.png" },
        { id: 15, name: "pro5", coins: 94.6, avatar: "/user/pp10.png" },
      ],
      4: [
        { id: 16, name: "pro6", coins: 98.5, avatar: "/user/pp11.png" },
        { id: 17, name: "pro7", coins: 97.3, avatar: "/user/pp12.png" },
        { id: 18, name: "pro8", coins: 96.0, avatar: "/user/pp13.png" },
        { id: 19, name: "pro9", coins: 95.2, avatar: "/user/pp14.png" },
        { id: 20, name: "pro10", coins: 94.0, avatar: "/user/pp15.png" },
      ],
      5: [
        { id: 21, name: "pro11", coins: 93.5, avatar: "/user/pp16.png" },
        { id: 22, name: "pro12", coins: 92.8, avatar: "/user/pp1.png" },
        { id: 23, name: "pro13", coins: 91.6, avatar: "/user/pp2.png" },
        { id: 24, name: "pro14", coins: 90.5, avatar: "/user/pp3.png" },
        { id: 25, name: "pro15", coins: 89.2, avatar: "/user/pp4.png" },
      ],
      6: [
        { id: 26, name: "pro16", coins: 88.7, avatar: "/user/pp5.png" },
        { id: 27, name: "pro17", coins: 87.5, avatar: "/user/pp6.png" },
        { id: 28, name: "pro18", coins: 86.2, avatar: "/user/pp7.png" },
        { id: 29, name: "pro19", coins: 85.8, avatar: "/user/pp8.png" },
        { id: 30, name: "pro20", coins: 84.6, avatar: "/user/pp9.png" },
      ],
      7: [
        { id: 31, name: "pro21", coins: 83.0, avatar: "/user/pp10.png" },
        { id: 32, name: "pro22", coins: 82.2, avatar: "/user/pp11.png" },
        { id: 33, name: "pro23", coins: 81.8, avatar: "/user/pp12.png" },
        { id: 34, name: "pro24", coins: 80.5, avatar: "/user/pp13.png" },
        { id: 35, name: "pro25", coins: 79.9, avatar: "/user/pp14.png" },
      ],
      8: [
        { id: 36, name: "pro26", coins: 78.6, avatar: "/user/pp15.png" },
        { id: 37, name: "pro27", coins: 77.4, avatar: "/user/pp16.png" },
        { id: 38, name: "pro28", coins: 76.5, avatar: "/user/pp1.png" },
        { id: 39, name: "pro29", coins: 75.3, avatar: "/user/pp2.png" },
        { id: 40, name: "pro30", coins: 74.0, avatar: "/user/pp3.png" },
      ],
};
  
