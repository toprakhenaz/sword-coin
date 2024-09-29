'use client'

import React, { useState } from 'react';
import Navbar from '../Navbar';
import HeaderCard from '../HeaderCard';
import Friends from './Friends';
import RefferanceRow from './RefferanceRow';
import { Referance, User } from '@prisma/client';
import axios from 'axios';
import Popup from '../Popup';

interface UserWithReferences extends User {
  referances: Referance[];
}

interface UserType {
  user: UserWithReferences | null;
}

export default function Referral({ user }: UserType) {
  const [currentUser, setCurrentUser] = useState<UserWithReferences | null>(user);
  const [popup , setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
 
  const collectCoins = async (refId: number) => {
    if (!currentUser) return;

    let totalEarned = 0;
    console.log('tıklandı');

    await Promise.all(
      currentUser.referances.map(async (ref) => {
        if (ref.referencedId === refId && !ref.isClaimed) {
          totalEarned =currentUser.coins + ref.referenceAmount;
          setPopupMessage(`${ref.referenceAmount} coin kazandınız tebrikler!!`);
          setPopup(true);

          try {
            await axios.post('/api/claim-friends', {
              userId: currentUser.id, // Kullanıcı ID
              id: ref.id,             // Referans ID
              isClaimed: true,        // Ödül alındı mı?
              coins: totalEarned,     // Kazanılan coin miktarı
            });

            return {
              ...ref,
              isClaimed: true,
            };
          } catch (error) {
            console.error('Referans ödülü kaydedilirken hata oluştu:', error);
          }
        }
        return ref;
      })
    );

    setCurrentUser(currentUser);

  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-900 text-white font-sans min-h-screen flex flex-col p-6">
      <HeaderCard coins={currentUser.coins} hourlyEarn={currentUser.coinsHourly} />
      <Friends length={currentUser.referances.length || 0} />
      <div className="space-y-4 overflow-y-auto" style={{ minHeight: '25vh', maxHeight: '30vh' }}>
        {currentUser.referances.map((referance, index) => (
          <RefferanceRow
            referance={referance}
            collectCoins={collectCoins}
            key={index}
          />
        ))}
      </div>
      <Navbar />

      {
        popup &&   <Popup
        title="Referans ödülü alındı!!"
        message={popupMessage}
        image={'/coins.png'}
        onClose={() => {setPopup(false) ; setPopupMessage('');}}
      />
      }
    </div>
  );
}
