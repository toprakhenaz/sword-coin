export const Cards = [
  // Ekipmanlar
  { id: 1, name: "Abyssal Hammer", image: "/card-images/equipment/abyssal-hammer.png", hourlyIncome: 150, level: 0, upgradeCost: 1000, category: "Ekipman" },
  { id: 2, name: "Celestial Shield", image: "/card-images/equipment/celestial-shield.png", hourlyIncome: 200, level: 0, upgradeCost: 1500, category: "Ekipman" },
  { id: 3, name: "Void Reaver", image: "/card-images/equipment/void-reaver.png", hourlyIncome: 250, level: 0, upgradeCost: 2000, category: "Ekipman" },
  { id: 4, name: "Starlight Gauntlet", image: "/card-images/equipment/starlight-gauntlet.png", hourlyIncome: 300, level: 0, upgradeCost: 2500, category: "Ekipman" },

  // Özel Kartlar (Rank Bazlı)
  { id: 5, name: "S-Class Legend", image: "/card-images/special/s-rank.png", hourlyIncome: 5000, level: 0, upgradeCost: 100000, category: "Özel" },
  { id: 6, name: "A-Class Hero", image: "/card-images/special/a-rank.png", hourlyIncome: 4000, level: 0, upgradeCost: 80000, category: "Özel" },
  { id: 7, name: "B-Class Champion", image: "/card-images/special/b-rank.png", hourlyIncome: 3000, level: 0, upgradeCost: 60000, category: "Özel" },
  { id: 8, name: "C-Class Warrior", image: "/card-images/special/c-rank.png", hourlyIncome: 2000, level: 0, upgradeCost: 40000, category: "Özel" },
  { id: 9, name: "Prime Artisan", image: "/card-images/special/f-rank-2.png", hourlyIncome: 1500, level: 0, upgradeCost: 30000, category: "Özel" },
  { id: 10, name: "Lady of the S-Rank", image: "/card-images/special/woman-s-rank.png", hourlyIncome: 4500, level: 0, upgradeCost: 90000, category: "Özel" },
  { id: 11, name: "Silver Valkyrie", image: "/card-images/special/silver-woman.png", hourlyIncome: 4300, level: 0, upgradeCost: 85000, category: "Özel" },
  { id: 12, name: "S-Rank Valkyrie", image: "/card-images/special/silver-woman-s-rank.png", hourlyIncome: 4700, level: 0, upgradeCost: 95000, category: "Özel" },

  // İşçiler (Rank Bazlı)
  { id: 13, name: "E-Class Worker", image: "/card-images/workers/e-rank.png", hourlyIncome: 1000, level: 0, upgradeCost: 15000, category: "İşçiler" },
  { id: 14, name: "F-Class Worker", image: "/card-images/workers/f-rank.png", hourlyIncome: 900, level: 0, upgradeCost: 13000, category: "İşçiler" },
  { id: 15, name: "G-Class Worker", image: "/card-images/workers/g-rank.png", hourlyIncome: 800, level: 0, upgradeCost: 11000, category: "İşçiler" },
  { id: 16, name: "H-Class Worker", image: "/card-images/workers/h-rank.png", hourlyIncome: 700, level: 0, upgradeCost: 9000, category: "İşçiler" },
];

const cardImages: Record<number | string, string> = {
  // Ekipmanlar
  1: "/card-images/equipment/abyssal-hammer.png",  // Abyssal Hammer
  2: "/card-images/equipment/celestial-shield.png",  // Celestial Shield
  3: "/card-images/equipment/void-reaver.png",  // Void Reaver
  4: "/card-images/equipment/starlight-gauntlet.png",  // Starlight Gauntlet
  
  // Özel Kartlar
  5: "/card-images/special/s-rank.png",  // S-Class Legend
  6: "/card-images/special/a-rank.png",  // A-Class Hero
  7: "/card-images/special/b-rank.png",  // B-Class Champion
  8: "/card-images/special/c-rank.png",  // C-Class Warrior
  9: "/card-images/special/f-rank-2.png",  // Prime Artisan
  10: "/card-images/special/woman-s-rank.png",  // Lady of the S-Rank
  11: "/card-images/special/silver-woman.png",  // Silver Valkyrie
  12: "/card-images/special/silver-woman-s-rank.png",  // S-Rank Valkyrie
  
  // İşçiler
  13: "/card-images/workers/e-rank.png",  // E-Class Worker
  14: "/card-images/workers/f-rank.png",  // F-Class Worker
  15: "/card-images/workers/g-rank.png",  // G-Class Worker
  16: "/card-images/workers/h-rank.png",  // H-Class Worker

  // Kılıçlar (Seviye Bazlı)
  "bronze": "/ligImages/bronze-sword.png",        // 2. Seviye: Bronz Kılıç
  "iron": "/ligImages/iron-sword.png",            // 3. Seviye: Demir Kılıç
  "steel": "/ligImages/steel-sword.png",          // 4. Seviye: Çelik Kılıç
  "mithril": "/ligImages/adamantite-sword.png",   // 5. Seviye: Mithril Kılıç
  "adamantite": "/ligImages/adamantite-sword.png",// 6. Seviye: Adamantit Kılıç
  "dragon": "/ligImages/dragon-sword.png",        // 7. Seviye: Ejderha Kılıcı
  "legendary": "/ligImages/legendary-sword.png",  // 8. Seviye: Efsanevi Kılıç
};

// Ekstra fonksiyonlar veya işlemler burada yapılabilir, örneğin:
// Kılıç resmini id'ye göre almak
export function getCardImage(cardId: number): string {
  return cardImages[cardId] || "/default-image.png";  // Eğer bir resim yoksa varsayılan resim
}
