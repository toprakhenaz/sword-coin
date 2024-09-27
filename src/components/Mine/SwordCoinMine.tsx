'use client'

import { useEffect, useState } from 'react';
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
import axios from 'axios';
import SkeletonLoading from '@/app/skeleton/SkeletonMine';

interface UserType {
  user: User & { cards: { id: number; userId: number; cardId: number; level: number }[] };
}

interface UpgradeData {
  userId: number;
  cardId: number;
  newLevel: number;
  newUserCoins: number;
  newUserCoinsHourly: number;
  newFoundCards?: string;
}

const initialCards: CardData[] = Cards;

const MainPage = ({ user }: UserType) => {
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
      hourlyIncome: userCard ? calculateHourlyEarn(userCard.level, card.hourlyIncome) : card.hourlyIncome,
      upgradeCost: userCard ? calculateUpgradeCost(userCard.level, card.upgradeCost) : card.upgradeCost
    };
  });

  const [cards, setCards] = useState<CardData[]>(userCards);
  const [coins, setCoins] = useState(user.coins);
  const [hourlyEarn, setHourlyEarn] = useState(user.coinsHourly);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [cardFounded, setCardFounded] = useState(false);
  const [foundCards, setFoundCards] = useState<number[]>(user.foundCards.split(',').map(Number)); 
  const [activeCategory, setActiveCategory] = useState("Ekipman");
  const [isloading, setIsloading] = useState(true);
  const [allCardsFound, setAllCardsFound] = useState(false); // Tüm kartlar bulunduğunda ödül için

  const dailyCombo = [1, 2, 4];

  useEffect(() => {
    setInterval(() => {
      setIsloading(false);
    }, 2000);
  });

  useEffect(() => {
    // Eğer tüm kartlar bulunduysa ve daha önce ödül verilmediyse 100.000 coin ver
    if (dailyCombo.every(cardId => foundCards.includes(cardId)) && !allCardsFound) {
      setCoins(prevCoins => prevCoins + 100000); // 100.000 coin ekle
      setAllCardsFound(true); // Ödül bir kez verildiği için bu durumu güncelle
    }
  }, [foundCards]);

  const handleUpgradeClick = (card: CardData) => {
    if (coins >= card.upgradeCost) {
      setSelectedCard(card);
      setShowPopup(true);
    } else {
      alert("Yeterli coininiz yok!");
    }
  };

  const saveUserCardData = async (data: UpgradeData) => {
    try {
      const response = await axios.post('/api/upgradeCard', data);
      console.log('User data saved successfully', response.data);
    } catch (error) {
      console.error('Error saving card data:', error);
    }
  };

  const handleUpgradeConfirm = async () => {
    if (selectedCard) {
      const newCoins = coins - selectedCard.upgradeCost;
      const newLevel = selectedCard.level + 1;
      const newUpgradeCost = calculateUpgradeCost(newLevel, selectedCard.upgradeCost);
      const newHourlyIncome = calculateHourlyEarn(newLevel, selectedCard.hourlyIncome);
      const newHourlyEarn = hourlyEarn + newHourlyIncome - selectedCard.hourlyIncome;

      let updatedFoundCards = [...foundCards];
      if (dailyCombo.includes(selectedCard.id) && !foundCards.includes(selectedCard.id)) {
        updatedFoundCards = [...foundCards, selectedCard.id];
        setFoundCards(updatedFoundCards);
        setCardFounded(true);
      }

      const myCard = user.cards.find((userCard) => userCard.cardId === selectedCard.id);

      const data: UpgradeData = {
        userId: user.id,
        cardId: myCard ? myCard.id : selectedCard.id, // Eğer myCard varsa ID'sini al, yoksa 0
        newLevel: newLevel,
        newUserCoins: newCoins,
        newUserCoinsHourly: newHourlyEarn,
        newFoundCards: updatedFoundCards.join(','),
      };

      await saveUserCardData(data); // Yeni data burada güncellenerek gönderiliyor

      setCoins(newCoins);
      setHourlyEarn(newHourlyEarn);

      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === selectedCard.id
            ? {
                ...card,
                level: newLevel,
                hourlyIncome: newHourlyIncome,
                upgradeCost: newUpgradeCost,
              }
            : card
        )
      );
    }
    setShowPopup(false);
  };

  const filteredCards = cards.filter(card => card.category === activeCategory);

  return isloading ? (
    <SkeletonLoading />
  ) : (
    <div className="min-h-screen flex flex-col p-4 sm:p-1 space-y-4 bg-gray-900 text-white font-['Poppins',sans-serif]">
      <HeaderCard coins={coins} hourlyEarn={hourlyEarn} />
      <TimerBar dailyCombo={dailyCombo} foundCards={foundCards} /> 
      <BottomNav activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

      <div className="grid grid-cols-2 gap-3 overflow-y-auto" style={{ height: "45vh" }}>
        {filteredCards.map((card) => (
          <Card key={card.id} card={card} onUpgrade={() => handleUpgradeClick(card)} coins={coins} />
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
