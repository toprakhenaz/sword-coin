import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from '@/icons';
import { TimerBarProps } from '@/types';
import { getCardImage } from '@/data/cardData';

export default function TimerBar({ dailyCombo, foundCards }: TimerBarProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0); 

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0); 
      const timeRemaining = Math.floor((endOfDay.getTime() - now.getTime()) / 1000); 
      setTimeLeft(timeRemaining);
    };

    calculateTimeLeft(); // Başlangıçta zaman hesapla

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(intervalId); 
          return 0;
        }
        return prevTime - 1; 
      });
    }, 1000);

    return () => clearInterval(intervalId); // Bileşen unmount olduğunda interval temizlenir
  }, []);

  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div className="bg-gray-800 rounded-lg p-3 sm:p-4 flex items-center justify-between">
        <div className="flex items-center">
          <FontAwesomeIcon icon={icons.clock} className="text-xl mr-2 text-yellow-300" />
          <div>
            <div className="text-sm sm:text-base font-semibold">Daily Combo</div>
            <div className="text-xs sm:text-sm text-gray-400">{formatTime(timeLeft)}</div>
          </div>
        </div>
        <div className="flex items-center ml-4">
          <FontAwesomeIcon icon={icons.coins} className="text-yellow-400 mr-2" />
          <span className="text-lg sm:text-xl font-bold">100,000</span>
          <FontAwesomeIcon icon={icons.infoCircle} className="ml-3" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {dailyCombo.map((cardId) => (
          <div key={cardId} className="bg-gray-800 rounded-lg flex items-center justify-center">
            {foundCards.includes(cardId) ? (
              <img src={getCardImage(cardId)} alt={`Card ${cardId}`} className="w-full h-auto" />
            ) : (
              <FontAwesomeIcon icon={icons.question} className="text-6xl text-yellow-400" />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
