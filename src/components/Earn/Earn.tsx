'use client';

import React, { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '../Navbar';
import { Alert, AlertDescription, AlertTitle } from './Alert';
import { icons } from '@/icons';
import { Progress } from './Progress';
import { Card, CardContent } from './EarnCard';
import HeaderCard from '../HeaderCard';
import { Mission, User } from '@prisma/client';
import { dailyRewardData, missions } from '@/data/GeneralData';
import Modal from './Modal';
import { SpecialOffer } from '@/types';
import { Button } from './Button';
import axios from 'axios';



interface UserWithMissions extends User{
  missions: Mission[]; 
}

interface UserType {
  user: UserWithMissions; 
}

const initialMissions : SpecialOffer[] = missions;

export default function Earn({ user }: UserType) {

  const userMissions = initialMissions.map((mission) => {
    const userMission= user.missions.find((userMission) => userMission.id === mission.id);
    return {
      ...mission,
      isClaimed : userMission?.isClaimed,
    };
  });


  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string>('');
  const [dailyRewards] = useState<number[]>(dailyRewardData);
  const [specialOffers, setSpecialOffers] = useState<SpecialOffer[] >(userMissions);

  const showPopup = (message: string): void => {
    setPopupMessage(message);
    setPopupOpen(true);
  };

  const handleDailyReward = async (): Promise<void> => {
    const today = new Date().toLocaleDateString();
    
    if (user.dailyRewardDate.toLocaleDateString() === today) {
      showPopup('Zaten ödül aldınız!');
      return;
    }
  
    const lastDate = user.dailyRewardDate ? new Date(user.dailyRewardDate) : null;
    if (lastDate && lastDate.getDate() === new Date().getDate() - 1) {
      user.dailyRewardStreak += 1;
    } else {
      user.dailyRewardStreak = 1;
    }
  
    user.coins += dailyRewards[user.dailyRewardStreak - 1];
  
    try {
      // Veritabanında günlük ödül güncelle
      await axios.post('/api/claim-daily-reward', {
        userId: user.id,
        coins: user.coins,
        dailyRewardStreak: user.dailyRewardStreak,
        dailyRewardDate: new Date(),
      });
  
      showPopup(`Günün ödülü: ${dailyRewards[user.dailyRewardStreak - 1]} coin aldınız!`);
      setModalOpen(false);
    } catch (error) {
      console.error('Günlük ödül kaydedilirken hata oluştu:', error);
    }
  };

  const handleSpecialOffer = async (offer: SpecialOffer): Promise<void> => {
    try {
      window.open(offer.link, '_blank');
  
      setTimeout(async () => {
        user.coins += offer.reward;
  
        await axios.post('/api/claim-mission', { missionId: offer.id });
  
        showPopup(`Tebrikler! ${offer.reward} coin kazandınız!`);
        setSpecialOffers(specialOffers.filter(o => o !== offer));
      }, 10000);
    } catch (error) {
      console.error('Ödül kaydedilirken hata oluştu:', error);
    }
  };

  return (
    <div className="bg-gray-900 text-white p-4 mx-auto min-h-screen">
      <HeaderCard coins={user.coins} hourlyEarn={user.coinsHourly} />

      <Card className="bg-gradient-to-r from-yellow-600 to-yellow-800 mb-4">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">Günlük Ödül</h3>
              <p className="text-sm">Streak: {user.dailyRewardStreak} gün</p>
            </div>
            <Button 
              onClick={() => setModalOpen(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              <FontAwesomeIcon icon={icons.gift} className="mr-2" />
              Ödülü Al
            </Button>
          </div>
          <Progress value={(user.dailyRewardStreak / 7) * 100} className="mt-2" />
        </CardContent>
      </Card>

      <h2 className="text-xl font-bold mb-4">Özel Teklifler</h2>
      <div className="space-y-4 overflow-y-auto" style={{ maxHeight: '55vh', minHeight: '45vh' }}>
    {specialOffers.map((offer, index) => (
      <Card key={index} className="bg-gray-800">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold">{offer.title}</h3>
              <p className="text-sm text-yellow-500">{offer.reward} coin</p>
            </div>
            <Button 
              onClick={() => handleSpecialOffer(offer)}
              className="bg-blue-500 hover:bg-blue-600"
              disabled={offer.isClaimed} // Eğer isClaimed true ise butonu devre dışı bırak
            >
              <FontAwesomeIcon 
                icon={offer.isClaimed ? icons.check : icons.externalLinkAlt} 
                className="mr-2" 
              />
              {offer.isClaimed ? 'Alındı' : 'Git'}
            </Button>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Günlük Ödüller</h2>
        <ul className="mb-4 space-y-2">
          {dailyRewards.map((reward, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>Gün {index + 1}</span>
              <span className={`font-bold ${index + 1 === user.dailyRewardStreak ? 'text-yellow-500' : ''}`}>
                {reward} coin
              </span>
            </li>
          ))}
        </ul>
        <Button onClick={handleDailyReward} className="w-full bg-yellow-500 text-black hover:bg-yellow-600">
          Ödülünü Al
        </Button>
        <Button onClick={() => setModalOpen(false)} className="w-full mt-2 bg-gray-700 hover:bg-gray-600">
          Kapat
        </Button>
      </Modal>

      <Modal isOpen={popupOpen} onClose={() => setPopupOpen(false)}>
        <Alert>
          <AlertTitle>Bildirim</AlertTitle>
          <AlertDescription>{popupMessage}</AlertDescription>
        </Alert>
        <Button onClick={() => setPopupOpen(false)} className="w-full mt-4 bg-blue-500 hover:bg-blue-600">
          Tamam
        </Button>
      </Modal>

      <Navbar />
    </div>
  );
};
