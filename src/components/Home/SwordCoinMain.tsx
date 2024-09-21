'use client';

import { useState, useEffect , useCallback } from 'react';
import Header from '@/components/Home/Header';
import CoinDisplay from '@/components/Home/CoinDisplay';
import CentralButton from '@/components/Home/CentralButton';
import EnergyBar from '@/components/Home/EnergyBar';
import Navbar from '@/components/Navbar';
import { ligCoin,ligImage, ligEearningCoin} from '@/data/GeneralData';
import Popup from '@/components/Popup'; 
import LeagueOverlay from './LeagueOverlay';


interface User {
  userName: string;
  userId: number;
  coins: number;
  energy: number;
  maxEnergy: number;
  lig: number;
  hourlyEarn: number;
  earnPerTap: number;
  lastBoostTime: Date;
  dailyBoostCount: number;
}

interface userType {
  user: User;
}

export default function MainPage({ user: initialUser }: userType) {
  const [user, setUser] = useState(initialUser);
  const [showPopup, setShowPopup] = useState(false);
  const [showLeagueOverlay, setShowLeagueOverlay] = useState(false);

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
      alert(
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
        let hasLeveledUp = false;
        let earnedCoin = 0;
  
        // Lig güncellemesini kontrol et
        if (ligCoin[prevUser.lig + 1] && newCoin >= ligCoin[prevUser.lig + 1]) {
          newLig = prevUser.lig + 1;
          earnedCoin = ligEearningCoin[newLig];
          hasLeveledUp = true; // Lig atlandıysa true yap
        }
        newCoin = newCoin + earnedCoin; 
  
        return {
          ...prevUser,
          energy: Math.max(prevUser.energy - user.earnPerTap, 0),
          coins: newCoin,
          lig: newLig,
        };
      });
  
      // Popup gösterme işlemini burada setUser işleminden sonra yapıyoruz
      setTimeout(() => {
        setUser((prevUser) => {
          // Eğer lig atlanmışsa popup göster
          if (prevUser.lig > user.lig) {
            setShowPopup(true);
          }
          return prevUser;
        });
      }, 100); // setUser işlemi asenkron olduğu için küçük bir gecikme ekledik
    }
  };
  

  const handleClosePopup = () => {
    setShowPopup(false); // Popup'ı kapat
  };

  return (
    <div className='min-h-screen flex flex-col text-white space-y-4 p-6 overflow-x-hidden'>
      <Header hourlyEarn={user.hourlyEarn} coinsToLevelUp={ligCoin[user.lig + 1] ? ligCoin[user.lig + 1] : 0} earnPerTap={user.earnPerTap} />
      <CoinDisplay coins={user.coins} league={user.lig} onclick = {toggleLeagueOverlay}/>
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

      {showLeagueOverlay && (
        <LeagueOverlay 
          onClose={toggleLeagueOverlay} 
          coins={user.coins}
        />
      )}
    </div>
  );
}

