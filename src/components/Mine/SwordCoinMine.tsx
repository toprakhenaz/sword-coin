'use client';

import { useState, useEffect } from 'react';
import Header from './Header';
import TimerBar from './TimeBar';
import Card from './Card';
import BottomNav from './BottomNav';
import Navbar from '../Navbar';
import ConfirmationPopup from './ConfirmationPopup';
import Popup from '../Popup'; // Kart bulundu pop-up'ı
import { user } from '@/data/GeneralData';

interface CardData {
  id: number;
  name: string;
  image: string;
  hourlyIncome: number;
  level: number;
  upgradeCost: number;
  category: string;
}

const initialCards: CardData[] = [
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


const MainPage = () => {
  const [cards, setCards] = useState<CardData[]>(initialCards);
  const [coins, setCoins] = useState(user.coins);
  const [hourlyEarn, setHourlyEarn] = useState(user.hourlyEarn);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [dailyCombo, setDailyCombo] = useState<number[]>([1, 3, 5]); // Örneğin günlük combo kartlarını sabit olarak belirledik.
  const [foundCards, setFoundCards] = useState<number[]>([]); // Bulunan kartlar ID'leri
  const [activeCategory, setActiveCategory] = useState("Ekipman");

  const calculateUpgradeCost = (level: number, oldCost: number) => {
    return Math.pow(2, level) * 50 + oldCost;
  };

  const calculateHourlyEarn = (level: number, oldEarn: number) => {
    return level * 50 + oldEarn;
  };

  const handleUpgradeClick = (card: CardData) => {
    if (coins >= card.upgradeCost) {
      setSelectedCard(card);
      setShowPopup(true);
    } else {
      alert("Yeterli coininiz yok!");
    }
  };

  const handleUpgradeConfirm = () => {
    if (selectedCard) {
      setCoins((prevCoins) => prevCoins - selectedCard.upgradeCost);
      setHourlyEarn((prevEarn) => prevEarn + selectedCard.hourlyIncome);

      setCards((prevCards) =>
        prevCards.map((card) => {
          if (card.id === selectedCard.id) {
            const newLevel = card.level + 1;
            const newUpgradeCost = calculateUpgradeCost(newLevel, card.upgradeCost);
            const newHourlyIncome = calculateHourlyEarn(newLevel, card.hourlyIncome);

            // Kart günlük combo içinde mi kontrol ediliyor ve bulunmuş kartlara ekleniyor
            if (dailyCombo.includes(card.id) && !foundCards.includes(card.id)) {
              setFoundCards([...foundCards, card.id]); // Kart bulunduysa ekle
            }

            return {
              ...card,
              level: newLevel,
              hourlyIncome: newHourlyIncome,
              upgradeCost: newUpgradeCost,
            };
          }
          return card;
        })
      );
    }
    setShowPopup(false);
  };

  const filteredCards = cards.filter(card => card.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-1 space-y-4 bg-gray-900 text-white font-['Poppins',sans-serif]">
      <Header coins={coins} hourlyEarn={hourlyEarn} />
      <TimerBar dailyCombo={dailyCombo} foundCards={foundCards} /> {/* TimerBar'a dailyCombo ve foundCards gönderiliyor */}
      <BottomNav activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

      <div className="grid grid-cols-2 gap-3 overflow-y-auto" style={{ height: "45vh" }}>
        {filteredCards.map((card) => (
          <Card key={card.id} card={card} onUpgrade={() => handleUpgradeClick(card)} />
        ))}
      </div>

      <Navbar />

      {showPopup && selectedCard && (
        <ConfirmationPopup
          title="Kart Yükseltme"
          message={`${selectedCard.name} kartını ${selectedCard.upgradeCost} coin karşılığında yükseltmek istiyor musunuz?`}
          onConfirm={handleUpgradeConfirm}
          onCancel={() => setShowPopup(false)}
        />
      )}

      {foundCards.length > 0 && (
        <Popup
          title="Kart Bulundu!"
          message={`${cards.find((card) => card.id === foundCards[foundCards.length - 1])?.name} kartı günlük komboda bulundu!`}
          image={cards.find((card) => card.id === foundCards[foundCards.length - 1])?.image || ""}
          onClose={() => setFoundCards([])}
        />
      )}
    </div>
  );
};

export default MainPage;
