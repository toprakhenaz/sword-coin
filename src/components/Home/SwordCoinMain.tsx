'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Home/Header';
import CoinDisplay from '@/components/Home/CoinDisplay';
import CentralButton from '@/components/Home/CentralButton';
import EnergyBar from '@/components/Home/EnergyBar';
import Navbar from '@/components/Navbar';
import { ligCoin, ligImage, ligEearningCoin } from '@/data/GeneralData';
import Popup from '@/components/Popup'; 
import LeagueOverlay from './LeagueOverlay';

interface CardData {
  id: number;    // Kartın ID'si
  level: number; // Kartın seviyesi
}

interface User {
  userName: string;      // Kullanıcı adı
  userId: number;        // Kullanıcı ID'si
  coins: number;         // Kullanıcıdaki toplam coin miktarı
  energy: number;        // Kullanıcının mevcut enerjisi
  maxEnergy: number;     // Kullanıcının maksimum enerjisi
  lig: number;           // Kullanıcının lig durumu
  hourlyEarn: number;    // Saatlik kazanç
  earnPerTap: number;    // Her tıklamada kazanılan miktar
  lastBoostTime: Date;   // Son boost zamanı
  dailyBoostCount: number; // Günlük boost hakkı
  cards: CardData[];     // Kullanıcının sahip olduğu kartlar
}

interface userType {
  user: User;
}

export default function MainPage({ user: initialUser }: userType) {
  const [user, setUser] = useState(initialUser);
  const [showPopup, setShowPopup] = useState(false);
  const [showLeagueOverlay, setShowLeagueOverlay] = useState(false);
  const [boostMessage, setBoostMessage] = useState(''); // Boost mesajı durumu
  const [earnTapPosition, setEarnTapPosition] = useState<{ top: number; left: number } | null>(null);

  const toggleLeagueOverlay = useCallback(() => {
    setShowLeagueOverlay(prev => !prev);
  }, []);

  // Enerji otomatik artışı
  useEffect(() => {
    const interval = setInterval(() => {
      setUser((prevUser) => {
        if (prevUser.energy < prevUser.maxEnergy) {
          return { ...prevUser, energy: prevUser.energy + 1 };
        }
        return prevUser;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Saatlik kazanca göre 30 saniyede bir coin ekleme
  useEffect(() => {
    const coinInterval = setInterval(() => {
      setUser((prevUser) => ({
        ...prevUser,
        coins: prevUser.coins + Math.floor(prevUser.hourlyEarn / 120), 
      }));
    }, 30000); // 30 saniye

    return () => clearInterval(coinInterval);
  }, []);

  // Boost işlevi
  const handleBoost = () => {
    const now = new Date();
    const lastBoostTime = new Date(user.lastBoostTime);
    const hoursSinceLastBoost = (now.getTime() - lastBoostTime.getTime()) / (1000 * 60 * 60);

    if (user.dailyBoostCount > 0 && hoursSinceLastBoost >= 3) {
      setUser((prevUser) => ({
        ...prevUser,
        energy: prevUser.maxEnergy,
        lastBoostTime: now,
        dailyBoostCount: prevUser.dailyBoostCount - 1,
      }));
    } else {
      // Popup mesajını ayarla
      setBoostMessage(
        user.dailyBoostCount === 0
          ? 'Günlük boost hakkınızı doldurdunuz!'
          : 'Boost özelliğini tekrar kullanmak için 3 saat beklemelisiniz!'
      );
    }
  };

  // Lig atlama kontrolü ve popup
  const handleButtonClick = () => {
    if (user.energy !== 0 && user.energy >= user.earnPerTap) {
      setUser((prevUser) => {
        let newCoin = prevUser.coins + user.earnPerTap;
        let newLig = prevUser.lig;
        let earnedCoin = 0;

        if (ligCoin[prevUser.lig + 1] && newCoin >= ligCoin[prevUser.lig + 1]) {
          newLig = prevUser.lig + 1;
          earnedCoin = ligEearningCoin[newLig];
        }
        newCoin = newCoin + earnedCoin;

        return {
          ...prevUser,
          energy: Math.max(prevUser.energy - user.earnPerTap, 0),
          coins: newCoin,
          lig: newLig,
        };
      });

      
     
    }

    // Rastgele pozisyonda mesaj oluştur
    const button = document.getElementById('central-button'); // Butonun id'sini al
    if (button) {
      const buttonRect = button.getBoundingClientRect(); // Butonun boyutlarını al
      const randomX = Math.random()+2 * (buttonRect.width - 50); // Mesaj için rastgele X
      const randomY = Math.random()+2 * (buttonRect.height - 20); // Mesaj için rastgele Y
      const offsetX = buttonRect.left + randomX; // Butonun konumuna göre ayarlama
      const offsetY = buttonRect.top + randomY; // Butonun konumuna göre ayarlama

      setEarnTapPosition({ 
        top: offsetY + window.scrollY, 
        left: offsetX + window.scrollX 
      });
    }

    // Titreşim efekti
    if (navigator.vibrate) {
      navigator.vibrate(50); // 50 ms titreşim
    }

    setTimeout(() => setEarnTapPosition(null), 1000); // 1 saniye sonra mesajı gizle

    setTimeout(() => {
      setUser((prevUser) => {
        if (prevUser.lig > user.lig) {
          setShowPopup(true);
        }
        return prevUser;
      });
    }, 100);
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Lig atlama popup'ını kapat
    setBoostMessage(''); // Boost mesajını sıfırla
  };

  return (
    <div className='min-h-screen flex flex-col text-white space-y-4 p-6 overflow-x-hidden'>
      <Header hourlyEarn={user.hourlyEarn} coinsToLevelUp={ligCoin[user.lig + 1] ? ligCoin[user.lig + 1] : 0} earnPerTap={user.earnPerTap} />
      <CoinDisplay coins={user.coins} league={user.lig} onclick={toggleLeagueOverlay} />
      <CentralButton onClick={handleButtonClick} league={user.lig} />
      <EnergyBar energy={user.energy} maxEnergy={user.maxEnergy} boost={handleBoost} />
      <Navbar />
      {showPopup && (
        <Popup
          title="Tebrikler! Lig Atladınız!"
          message={`Yeni lig: ${user.lig}. Bu ligde ${ligEearningCoin[user.lig]} coin kazandınız.`}
          image={ligImage[user.lig]} // Lig resmi
          onClose={handleClosePopup}
        />
      )}
      {boostMessage && ( // Boost mesajını göster
        <Popup
          title="Uyarı"
          message={boostMessage}
          image='/rocket.png'
          onClose={handleClosePopup}
        />
      )}
      {showLeagueOverlay && (
        <LeagueOverlay 
          onClose={toggleLeagueOverlay} 
          coins={user.coins}
        />
      )}

      {earnTapPosition && (
        <div 
          className="text-xl z-100"
          style={{
            top: earnTapPosition.top,
            left: earnTapPosition.left,
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.5s',
            opacity: 1,
          }}
        >
          +{user.earnPerTap}
        </div>
      )}
    </div>
  );
}
