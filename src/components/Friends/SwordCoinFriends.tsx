'use client'

import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import HeaderCard from '../HeaderCard';
import Friends from './Friends';
import RefferanceRow from './RefferanceRow';
import { Referance, User } from '@prisma/client';

interface UserWithReferences extends User {
  references: (Referance & { referencedUser: { league: number } })[];
}

interface UserType {
  user: UserWithReferences | null;
}

export default function Referral({ user }: UserType) {
  const [currentUser, setCurrentUser] = useState<UserWithReferences | null>(user);

  useEffect(() => {
    if (currentUser) {
      const fetchReferencedUsersLeague = async () => {
        const updatedReferences = await Promise.all(
          currentUser.references.map(async (ref) => {
            const response = await fetch(`/api/user/${ref.referencedId}`);
            const referencedUser = await response.json();
            return {
              ...ref,
              referencedUser: { league: referencedUser.league }
            };
          })
        );
        setCurrentUser(prevUser => prevUser ? { ...prevUser, references: updatedReferences } : null);
      };

      fetchReferencedUsersLeague();
    }
  }, [currentUser]);

  const checkReferralLevels = () => {
    if (!currentUser) return;

    const updatedReferences = currentUser.references.map((ref) => {
      if (ref.referencedUser.league > ref.previousLig) {
        const ligDifference = ref.referencedUser.league - ref.previousLig;
        const newAmount = ligDifference * 1000; // 1000 coins per league jump

        return {
          ...ref,
          referenceAmount: ref.referenceAmount + newAmount,
          previousLig: ref.referencedUser.league,
        };
      }
      return ref;
    });

    setCurrentUser(prevUser => prevUser ? { ...prevUser, references: updatedReferences } : null);
  };

  const collectCoins = (refId: number) => {
    if (!currentUser) return;

    const updatedReferences = currentUser.references.map((ref) => {
      if (ref.id === refId && !ref.isClaimed) {
        return { 
          ...ref, 
          isClaimed: true 
        };
      }
      return ref;
    });

    const totalCollected = updatedReferences.find(ref => ref.id === refId)?.referenceAmount || 0;

    setCurrentUser(prevUser => prevUser ? {
      ...prevUser,
      references: updatedReferences,
      coins: prevUser.coins + totalCollected
    } : null);
  };

  useEffect(() => {
    if (currentUser) {
      checkReferralLevels();
    }
  }, [currentUser?.references]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-900 text-white font-sans min-h-screen flex flex-col p-6">
      <HeaderCard coins={currentUser.coins} hourlyEarn={currentUser.coinsHourly} />
      <Friends length={currentUser.references.length || 0} />
      <div className="space-y-4 overflow-y-auto" style={{ minHeight: '25vh', maxHeight: '30vh' }}>
        {currentUser.references.map((reference, index) => (
          <RefferanceRow
            refferance={reference}
            totalEarned={reference.referenceAmount}
            collectCoins={collectCoins}
            key={index}
          />
        ))}
      </div>
      <Navbar />
    </div>
  );
}