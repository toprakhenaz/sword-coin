'use client'
import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import HeaderCard from '../HeaderCard';
import { User} from '@/types';
import { Myusers } from '@/data/GeneralData';
import Friends from './Friends';
import RefferanceRow from './RefferanceRow';


export default function Referral(){
  const [users, setUsers] = useState<User[]>(Myusers);
  const [currentUser, setCurrentUser] = useState<User>(users[1]); 

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
      <HeaderCard coins={currentUser.coins} hourlyEarn={currentUser.hourlyEarn} />
      <Friends length={currentUser?.refferances.length || 0} />
      <div className="space-y-4 overflow-y-auto" style={{ minHeight: '25vh', maxHeight : '30vh'}}>
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
