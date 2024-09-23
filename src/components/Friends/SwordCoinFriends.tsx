'use client'

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faCopy, faHourglassStart } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Navbar';

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
  cards: { id: number; level: number }[];
  dailyCombo: number[];
  foundCards: number[];
  refferances: Refferance[];
}

interface Refferance {
  Id: number;
  refferanceAmount: number;
  isClaimed: boolean;
  previousLig: number; // Referans olunan kişinin en son bilinen ligi
}

interface FriendsProps {
  length: number;
}

interface RefferanceRowProps {
  refferance: Refferance;
  totalEarned: number;
  collectCoins: (refId: number) => void;
}

const Friends: React.FC<FriendsProps> = ({ length }) => {

  return (
    <>
      <div className="text-center mb-6 mt-6">
        <h1 className="text-3xl font-bold mb-2">{length} Arkadaşlar</h1>
        <p className="text-sm">Bir arkadaş davet et ve bonuslar kazan</p>
      </div>

      <div className="bg-zinc-900 rounded-lg p-4 mb-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-yellow-500 rounded-full mr-3 flex items-center justify-center">
            <div className="w-6 h-6 bg-yellow-300 rounded-full"></div>
          </div>
          <div>
            <p className="text-xs">Arkadaşını davet et</p>
            <p className="text-sm font-bold">Arkadaşın ve Sen 2500 Kazansın</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-10 h-10 text-purple-500 mr-3">
            <FontAwesomeIcon icon={faCoins} />
          </div>
          <div>
            <p className="text-xs">Telegram Premium ile davet et</p>
            <p className="text-sm font-bold">Her davet ettiğinden %10 kazan</p>
          </div>
        </div>
        <div className="flex flex-col items-center mt-4">
          <button>Detayları Aç</button>
        </div>
      </div>

      <div className="flex space-x-3 mb-4">
        <button className="flex-grow bg-zinc-800 text-white py-3 rounded-xl text-sm font-medium">
          Arkadaşını Davet Et
        </button>
        <button className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0">
          <FontAwesomeIcon icon={faCopy} className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};

const RefferanceRow: React.FC<RefferanceRowProps> = ({ refferance, totalEarned, collectCoins }) => {
  return (
    <div className="bg-zinc-800 rounded-lg p-3 flex items-center justify-between">
      <div>
        <div className="font-bold">isim</div>
        <div className="text-sm sm:text-base text-yellow-300 font-semibold">
          <FontAwesomeIcon icon={faCoins} className="text-yellow-400 ml-1" />
          +{totalEarned}
        </div>
      </div>
      {refferance.isClaimed ? (
        <button className="text-gray-500 font-bold p-2">Collected</button>
      ) : (
        <button className="text-yellow-400 font-bold p-2" onClick={() => collectCoins(refferance.Id)}>
          Collect
        </button>
      )}
    </div>
  );
};

const Referral: React.FC = () => {
  
  
  const [users, setUsers] = useState<User[]>([
    {
      userName: 'Ali',
      userId: 1,
      coins: 200,
      energy: 200,
      maxEnergy: 500,
      lig: 1,
      hourlyEarn: 200,
      earnPerTap: 3,
      lastBoostTime: new Date(),
      dailyBoostCount: 3,
      cards: [{ id: 1, level: 2 }, { id: 3, level: 1 }],
      dailyCombo: [1, 5, 7],
      foundCards: [],
      refferances: [],
    },
    {
      userName: 'Mehmet',
      userId: 2,
      coins: 1500,
      energy: 250,
      maxEnergy: 600,
      lig: 4, // Mehmet lig atladı
      hourlyEarn: 250,
      earnPerTap: 5,
      lastBoostTime: new Date(),
      dailyBoostCount: 2,
      cards: [{ id: 2, level: 1 }],
      dailyCombo: [2, 4, 6],
      foundCards: [],
      refferances: [
        {
          Id: 1,
          refferanceAmount: 0,
          isClaimed: false,
          previousLig: 2, // Son bilinen lig
        },
      ],
    },
    // Diğer kullanıcılar buraya eklenir
  ]);

  const [currentUser, setCurrentUser] = useState<User | undefined>(users[1]); // Mehmet'i aktif kullanıcı olarak alıyoruz

  // Lig atlayan kullanıcıları kontrol eden fonksiyon
  const checkReferralLevels = () => {
    if (!currentUser) return;

    const updatedRefferances = currentUser.refferances.map(ref => {
      const referredUser = users.find(user => user.userId === ref.Id);
      if (referredUser && referredUser.lig > ref.previousLig) {
        const ligDifference = referredUser.lig - ref.previousLig;
        const newAmount = ligDifference * 1000; // Her lig atlaması başına 1000 coin ver

        return {
          ...ref,
          refferanceAmount: ref.refferanceAmount + newAmount,
          previousLig: referredUser.lig, // Lig güncelle
        };
      }
      return ref;
    });

    // Güncellenmiş referansları mevcut kullanıcıya ayarla
    setCurrentUser({ ...currentUser, refferances: updatedRefferances });
  };

  // Collect butonuna basıldığında çalışan fonksiyon
  const collectCoins = (refId: number) => {
    if (!currentUser) return;

    const updatedRefferances = currentUser.refferances.map(ref => {
      if (ref.Id === refId && !ref.isClaimed) {
        const updatedUsers = users.map(user => {
          if (user.userId === currentUser.userId) {
            return { ...user, coins: user.coins + ref.refferanceAmount };
          }
          return user;
        });
        setUsers(updatedUsers);
        return { ...ref, isClaimed: true };
      }
      return ref;
    });

    setCurrentUser({ ...currentUser, refferances: updatedRefferances });
  };

  useEffect(() => {
    checkReferralLevels(); // Sayfa yüklendiğinde ligleri kontrol et
  }, [users]);

  return (
    <div className="bg-gray-900 text-white font-sans min-h-screen flex flex-col p-6">
      <div className="text-center">
        <div className="flex flex-row justify-between text-2xl font-bold mb-2 p-4">
          <div>
            <FontAwesomeIcon icon={faCoins} className="text-yellow-400 mr-2" />
            <span>{currentUser?.coins}</span>
          </div>
          <div className="text-yellow-300 font-semibold">
            <FontAwesomeIcon icon={faHourglassStart} className="ml-2 mr-1" /> {currentUser?.energy}
          </div>
        </div>
      </div>
      <Friends length={currentUser?.refferances.length || 0} />
      <div className="space-y-4 overflow-y-auto" style={{ minHeight: '33vh' }}>
        {currentUser?.refferances.map((refferance, index) => {
          const totalEarned = refferance.refferanceAmount; // Toplam kazanç
          return (
            <RefferanceRow
              refferance={refferance}
              totalEarned={totalEarned}
              collectCoins={collectCoins}
              key={index}
            />
          );
        })}
      </div>
      <Navbar />
    </div>
  );
};

export default Referral;
