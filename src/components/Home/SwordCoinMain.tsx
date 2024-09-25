'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Header from '@/components/Home/Header';
import CoinDisplay from '@/components/Home/CoinDisplay';
import CentralButton from '@/components/Home/CentralButton';
import EnergyBar from '@/components/Home/EnergyBar';
import Navbar from '@/components/Navbar';
import { ligCoin, ligImage, ligEearningCoin} from '@/data/GeneralData';
import Popup from '@/components/Popup'; 
import LeagueOverlay from './LeagueOverlay';
import { User } from '@prisma/client';
import axios from 'axios';

export interface UserData {
  user: User;
}


export default function MainPage({ user: initialUser }: UserData) {
  const [Myuser, setUser] = useState(initialUser);
  const [showPopup, setShowPopup] = useState(false);
  const [showLeagueOverlay, setShowLeagueOverlay] = useState(false);
  const [boostMessage, setBoostMessage] = useState('');
  const [earnTapPosition, setEarnTapPosition] = useState<{ top: number; left: number } | null>(null);
  const userRef = useRef(Myuser);

  useEffect(() => {
    userRef.current = Myuser;
  }, [Myuser]);

  
  useEffect(() => {
    const saveInterval = setInterval(() => {
      console.log(userRef.current);
      saveUserData(userRef.current);
    }, 5000);

    return () => clearInterval(saveInterval);
  }, []);

  const saveUserData = async (user: User) => {
    try {
      const userToSave = {
        ...user
      };
      const response = await axios.post('/api/saveUser', userToSave);
      console.log('User data saved successfully', response.data);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };


  const toggleLeagueOverlay = useCallback(() => {
    setShowLeagueOverlay(prev => !prev);
  }, []);

  // Enerji Arttırımı
  useEffect(() => {
    const interval = setInterval(() => {
      setUser((prevUser) => {
        if (prevUser.energy < prevUser.energyMax) {
          return { ...prevUser, energy: prevUser.energy + 1 };
        }
        return prevUser;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Saatlik Coin Kazanç Arttırımı
  useEffect(() => {
    const coinInterval = setInterval(() => {
      setUser((prevUser) => ({
        ...prevUser,
        coins: prevUser.coins + Math.floor(prevUser.coinsHourly / 120),
      }));
    }, 30000);

    return () => clearInterval(coinInterval);
  }, []);

  
  // Boost işlevi
  const handleBoost = () => {
    const now = new Date();
    const lastBoostTime = new Date(Myuser.lastBoostTime);
    const hoursSinceLastBoost = (now.getTime() - lastBoostTime.getTime()) / (1000 * 60 * 60);

    if (Myuser.dailyBoostCount > 0 && hoursSinceLastBoost >= 3) {
      setUser((prevUser) => ({
        ...prevUser,
        energy: prevUser.energyMax,
        lastBoostTime: now,
        dailyBoostCount: prevUser.dailyBoostCount - 1,
      }));
    } else {
      setBoostMessage(
        Myuser.dailyBoostCount === 0
          ? 'Günlük boost hakkınızı doldurdunuz!'
          : 'Boost özelliğini tekrar kullanmak için 3 saat beklemelisiniz!'
      );
    }
  };

  const handleButtonClick = () => {
    if (Myuser.energy !== 0 && Myuser.energy >= Myuser.coinsPerTap) {
      setUser((prevUser) => {
        let newCoin = prevUser.coins + Myuser.coinsPerTap;
        let newLig = prevUser.league;
        let earnedCoin = 0;
        let newCoinsPerTap = prevUser.coinsPerTap

        if (ligCoin[prevUser.league + 1] && newCoin >= ligCoin[prevUser.league + 1]) {
          newLig = prevUser.league + 1;
          earnedCoin = ligEearningCoin[newLig];
          newCoin = newCoin + earnedCoin;
          newCoinsPerTap = newCoinsPerTap + 1;
          setShowPopup(true); 
        }
        if (navigator.vibrate) {
          navigator.vibrate(50);
        }
        

        const updatedUser = {
          ...prevUser,
          energy: Math.max(prevUser.energy - Myuser.coinsPerTap, 0),
          coins: newCoin,
          league: newLig,
          coinsPertap : newCoinsPerTap,
        };

        // Immediately save the updated user data
        if(newLig > prevUser.league){
          saveUserData(updatedUser);
        }

        return updatedUser;

      });
    }

  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setBoostMessage('');
  };



  return (
    <div className='min-h-screen flex flex-col text-white space-y-4 p-6 overflow-x-hidden'>
      <Header hourlyEarn={Myuser.coinsHourly} coinsToLevelUp={ligCoin[Myuser.league + 1] ? ligCoin[Myuser.league + 1] : 0} earnPerTap={Myuser.coinsPerTap} />
      <CoinDisplay coins={Myuser.coins} league={Myuser.league} onclick={toggleLeagueOverlay} />
      <CentralButton onClick={handleButtonClick} league={Myuser.league} />
      <EnergyBar energy={Myuser.energy} maxEnergy={Myuser.energyMax} boost={handleBoost} />
      <Navbar />

      {showPopup && (
        <Popup
          title="Tebrikler! Lig Atladınız!"
          message={`Yeni lig: ${Myuser.league}. Bu ligde ${ligEearningCoin[Myuser.league]} coin kazandınız.`}
          image={ligImage[Myuser.league]}
          onClose={handleClosePopup}
        />
      )}

      {boostMessage && (
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
          coins={Myuser.coins}
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
          +{Myuser.coinsPerTap}
        </div>
      )}
    </div>
  );
}
