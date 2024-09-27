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
import SkeletonLoading from '@/app/skeleton/SkeletonMain';

export interface UserData {
  user: User;
}


export default function MainPage({ user: initialUser }: UserData) {
  const [Myuser, setUser] = useState(initialUser);
  const [showPopup, setShowPopup] = useState(false);
  const [showLeagueOverlay, setShowLeagueOverlay] = useState(false);
  const [boostMessage, setBoostMessage] = useState('');
  const [earnTapPositions, setEarnTapPositions] = useState<Array<{ id: string; top: number; left: number }>>([]);
  const userRef = useRef(Myuser);
  const centralButtonRef = useRef<HTMLDivElement>(null);
  const [isloading , setIsloading] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setIsloading(false);
    }, 3000);

  });

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
    }, Math.floor(1000 /Myuser.league));
    
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

  const getRandomPosition = () => {
    if (centralButtonRef.current) {
      const buttonRect = centralButtonRef.current.getBoundingClientRect();
      const horizontalOffset = (Math.random() - 0.5) * buttonRect.width; // Random horizontal offset within button width
      const verticalOffset = Math.random() * 30 + 20; // Random vertical offset between 20 and 50 pixels above the button
      
      return {
        left: buttonRect.left + buttonRect.width / 2 + horizontalOffset,
        top: buttonRect.top - verticalOffset,
      };
    }
    return { left: 0, top: 0 };
  };

 

  const handleButtonClick = () => {
    if (Myuser.energy !== 0 && Myuser.energy >= Myuser.coinsPerTap) {
      setUser((prevUser) => {
        let newCoin = prevUser.coins + Myuser.coinsPerTap;
        let newLig = prevUser.league;
        let earnedCoin = 0;
        let newCoinsPerTap = prevUser.coinsPerTap;

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

        const position = getRandomPosition();
        setEarnTapPositions(prev => [...prev, { id: `${Date.now()}-${Math.random()}`, ...position }]);

        const updatedUser = {
          ...prevUser,
          energy: Math.max(prevUser.energy - Myuser.coinsPerTap, 0),
          coins: newCoin,
          league: newLig,
          coinsPerTap: newCoinsPerTap,
        };

        if(newLig > prevUser.league){
          saveUserData(updatedUser);
        }

        return updatedUser;
      });
    }
  };

  useEffect(() => {
    earnTapPositions.forEach(position => {
      const timer = setTimeout(() => {
        setEarnTapPositions(prev => prev.filter(p => p.id !== position.id));
      }, 300); // Remove after 1 second

      return () => clearTimeout(timer);
    });
  }, [earnTapPositions]);
  const handleClosePopup = () => {
    setShowPopup(false);
    setBoostMessage('');
  };



  return isloading ? (
    <SkeletonLoading />
  ) : (
    <div className='min-h-screen flex flex-col text-white space-y-6 p-6 overflow-x-hidden'>
      <Header hourlyEarn={Myuser.coinsHourly} coinsToLevelUp={ligCoin[Myuser.league + 1] ? ligCoin[Myuser.league + 1] : 0} earnPerTap={Myuser.coinsPerTap} />
      <CoinDisplay coins={Myuser.coins} league={Myuser.league} onclick={toggleLeagueOverlay} />
      <div ref={centralButtonRef} className="relative py-8">
        <CentralButton onClick={handleButtonClick} league={Myuser.league} />
        {earnTapPositions.map(position => (
          <div 
            key={position.id}
            className="absolute text-xl z-50 animate-riseAndFade"
            style={{
              top: position.top,
              left: position.left,
              transform: 'translate(-50%, -50%)',
              fontWeight : 'bolder',
            }}
          >
            +{Myuser.coinsPerTap}
          </div>
        ))}
      </div>
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

     
    </div>
  );
}
