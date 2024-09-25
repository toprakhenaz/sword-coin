'use client';

import { useState} from 'react';
import TimerBar from './TimeBar';
import Card from './Card';
import BottomNav from './BottomNav';
import Navbar from '../Navbar';
import ConfirmationPopup from './ConfirmationPopup';
import Popup from '../Popup'; 
import { user } from '@/data/GeneralData';
import { Cards } from '@/data/cardData';
import { CardData } from '@/types';
import HeaderCard from '../HeaderCard';


const initialCards: CardData[] = Cards;

const MainPage = () => {
  console.log("Rerendered")
  const [cards, setCards] = useState<CardData[]>(initialCards);
  const [coins, setCoins] = useState(user.coins);
  const [hourlyEarn, setHourlyEarn] = useState(user.hourlyEarn);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [foundCards, setFoundCards] = useState<number[]>(user.foundCards); // Bulunan kartlar
  const [activeCategory, setActiveCategory] = useState("Ekipman");

  // Günlük comboyu user'dan alıyoruz
  const dailyCombo = user.dailyCombo;
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
              const updatedFoundCards = [...foundCards, card.id];
              setFoundCards(updatedFoundCards);
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
      <HeaderCard coins={coins} hourlyEarn={hourlyEarn} />
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
