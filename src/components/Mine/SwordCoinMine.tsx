'use client';

import { useState} from 'react';
import TimerBar from './TimeBar';
import Card from './Card';
import BottomNav from './BottomNav';
import Navbar from '../Navbar';
import ConfirmationPopup from './ConfirmationPopup';
import Popup from '../Popup'; 
import { Cards } from '@/data/cardData';
import { CardData } from '@/types';
import HeaderCard from '../HeaderCard';
import { User } from '@prisma/client';
import { saveUpgrade, updateFoundCards } from '@/actions';

interface UserType {
  user : User & { cards: { cardId: number; level: number }[] } ;
}

const initialCards: CardData[] = Cards;

const MainPage = ({user} : UserType) => {
  console.log("user:" , user);

  const calculateUpgradeCost = (level: number, oldCost: number) => {
    return Math.pow(2, level) * 50 + oldCost;
  };

  const calculateHourlyEarn = (level: number, oldEarn: number) => {
    return level * 50 + oldEarn;
  };

  const userCards = initialCards.map((card) => {
    const userCard = user.cards.find((userCard) => userCard.cardId === card.id);
    return {
      ...card,
      level: userCard ? userCard.level : card.level,
      hourlyIncome : userCard ? calculateHourlyEarn(userCard.level , card.hourlyIncome) : card.hourlyIncome ,
      upgradeCost : userCard ? calculateUpgradeCost(userCard.level , card.upgradeCost) : card.upgradeCost
    };
  });

  const [cards, setCards] = useState<CardData[]>(userCards);
  const [coins, setCoins] = useState(user.coins);
  const [hourlyEarn, setHourlyEarn] = useState(user.coinsHourly);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [cardFounded , setCardFounded] = useState(false);
  const [foundCards, setFoundCards] = useState<number[]>(user.foundCards.split(',').map(Number)); 
  const [activeCategory, setActiveCategory] = useState("Ekipman");

  const dailyCombo = [3,6,11];
  
  const handleUpgradeClick = (card: CardData) => {
    if (coins >= card.upgradeCost) {
      setSelectedCard(card);
      setShowPopup(true);
    } else {
      alert("Yeterli coininiz yok!");
    }
  };
  
  const handleUpgradeConfirm = async () => {
    if (selectedCard) {
      const newCoins = coins - selectedCard.upgradeCost;
      const newHourlyEarn = hourlyEarn + selectedCard.hourlyIncome;
  
      setCoins(newCoins);
      setHourlyEarn(newHourlyEarn);
  
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
              setCardFounded(true);
              // Güncellenen foundCards'ı veritabanına kaydediyoruz
              updateFoundCards(user.id, updatedFoundCards);
            }
  
            // Veritabanında kart seviyesini güncelleme işlemi
            saveUpgrade(user.id, card.id, newLevel, newCoins, newHourlyEarn);
  
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

      {cardFounded && (
        <Popup
          title="Kart Bulundu!"
          message={`${cards.find((card) => card.id === foundCards[foundCards.length - 1])?.name} kartı günlük komboda bulundu!`}
          image={cards.find((card) => card.id === foundCards[foundCards.length - 1])?.image || ""}
          onClose={() => setCardFounded(false)}
        />
      )}
    </div>
  );
};

export default MainPage;
