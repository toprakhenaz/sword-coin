'use client';

import React, { useState, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '../Navbar';
import { Alert , AlertDescription, AlertTitle } from './Alert';
import { icons } from '@/icons';
import { Progress } from './Progress';
import { Card, CardContent} from './EarnCard';
import HeaderCard from '../HeaderCard';


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => (
  <button className={`px-4 py-2 rounded ${className}`} {...props}>
    {children}
  </button>
);


interface User {
  coins: number;
  hourlyEarn: number;
  lastRewardDate: string;
  rewardStreak: number;
}

const user: User = {
  coins: 1000,
  hourlyEarn: 10,
  lastRewardDate: '',
  rewardStreak: 0
};

interface SpecialOffer {
  title: string;
  reward: number;
  link: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <FontAwesomeIcon icon={icons.times} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const Earn: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string>('');
  const [dailyRewards] = useState<number[]>([1000, 2000, 3000, 4000, 5000, 6000, 7000]);
  const [specialOffers, setSpecialOffers] = useState<SpecialOffer[]>([
    { title: "X'te gemz'i takip et", reward: 10000, link: "https://x.com/gemz" },
    { title: "Instagram'da gemz'i takip et", reward: 15000, link: "https://instagram.com/gemz" },
    { title: "Discord'a katıl", reward: 20000, link: "https://discord.gg/gemz" },
    { title: "Arkadaşını davet et", reward: 25000, link: "https://gemz.app/invite" },
    { title: "Gemz uygulamasını değerlendir", reward: 30000, link: "https://play.google.com/store/apps/details?id=com.gemz" },
    { title: "Telegram grubuna katıl", reward: 35000, link: "https://t.me/gemz" },
  ]);

  const showPopup = (message: string): void => {
    setPopupMessage(message);
    setPopupOpen(true);
  };

  const handleDailyReward = (): void => {
    const today = new Date().toLocaleDateString();
    if (user.lastRewardDate === today) {
      showPopup('Zaten ödül aldınız!');
      return;
    }

    const lastDate = user.lastRewardDate ? new Date(user.lastRewardDate) : null;
    if (lastDate && lastDate.getDate() === new Date().getDate() - 1) {
      user.rewardStreak += 1;
    } else {
      user.rewardStreak = 1;
    }

    user.coins += dailyRewards[user.rewardStreak - 1];
    user.lastRewardDate = today;
    showPopup(`Günün ödülü: ${dailyRewards[user.rewardStreak - 1]} coin aldınız!`);
    setModalOpen(false);
  };

  const handleSpecialOffer = (offer: SpecialOffer): void => {
    window.open(offer.link, '_blank');
    // Simulate reward after 5 seconds (in a real app, you'd verify task completion)
    setTimeout(() => {
      user.coins += offer.reward;
      showPopup(`Tebrikler! ${offer.reward} coin kazandınız!`);
      setSpecialOffers(specialOffers.filter(o => o !== offer));
    }, 5000);
  };

  return (
    <div className="bg-gray-900 text-white p-4 mx-auto min-h-screen">
      <HeaderCard coins={user.coins} hourlyEarn={user.hourlyEarn} />

      <Card className="bg-gradient-to-r from-yellow-600 to-yellow-800 mb-4">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">Günlük Ödül</h3>
              <p className="text-sm">Streak: {user.rewardStreak} gün</p>
            </div>
            <Button 
              onClick={() => setModalOpen(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              <FontAwesomeIcon icon={icons.gift} className="mr-2" />
              Ödülü Al
            </Button>
          </div>
          <Progress value={(user.rewardStreak / 7) * 100} className="mt-2" />
        </CardContent>
      </Card>

      <h2 className="text-xl font-bold mb-4">Özel Teklifler</h2>
      <div className="space-y-4 overflow-y-auto" style={{ maxHeight: '55vh' , minHeight : '45vh'}}>
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
                >
                  <FontAwesomeIcon icon={icons.externalLinkAlt} className="mr-2" />
                  Git
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
              <span className={`font-bold ${index + 1 === user.rewardStreak ? 'text-yellow-500' : ''}`}>
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

export default Earn;