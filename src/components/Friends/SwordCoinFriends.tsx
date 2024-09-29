'use client'

import React, { useState } from 'react';
import Navbar from '../Navbar';
import HeaderCard from '../HeaderCard';
import Friends from './Friends';
import RefferanceRow from './RefferanceRow';
import { Referance, User } from '@prisma/client';
import axios from 'axios';
import Popup from '../Popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons } from '@/icons';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify components
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify

interface UserWithReferences extends User {
  referances: Referance[];
}

interface UserType {
  user: UserWithReferences;
}

export default function Referral({ user }: UserType) {
  const [currentUser, setCurrentUser] = useState<UserWithReferences>(user);
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const INVITE_URL = "https://t.me/innoSwordCoinBot/SwordCoin";

  const collectCoins = async (refId: number) => {
    if (!currentUser) return;

    let totalEarned = currentUser.coins; // Initialize with current coins
    console.log('tıklandı');

    const updatedReferences = await Promise.all(
      currentUser.referances.map(async (ref) => {
        if (ref.referencedId === refId && !ref.isClaimed) {
          const newAmount = ref.referenceAmount;
          totalEarned += newAmount; // Update total earned coins
          setPopupMessage(`${newAmount} coin kazandınız tebrikler!!`);
          setPopup(true);

          try {
            await axios.post('/api/claim-friends', {
              userId: currentUser.id,
              id: ref.id,
              isClaimed: true,
              coins: totalEarned,
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

    // Always return a valid UserWithReferences object
    setCurrentUser((prevUser) => ({
      ...prevUser,
      referances: updatedReferences,
      coins: totalEarned,
    }));
  };

  const handleCopyLink = () => {
    const inviteLink = `${INVITE_URL}?startapp=${currentUser.id}`;
    navigator.clipboard.writeText(inviteLink);
    toast.success('Invite link copied to clipboard!'); // Use toast instead of alert
  };

  return (
    <div className="bg-gray-900 text-white font-sans min-h-screen flex flex-col p-6">
      <HeaderCard coins={currentUser.coins} hourlyEarn={currentUser?.coinsHourly} />
      <Friends length={currentUser.referances.length || 0} />
      <div className="flex space-x-3 mb-4">
        <button className="flex-grow bg-zinc-800 text-white py-3 rounded-xl text-sm font-medium">
          Arkadaşını Davet Et
        </button>
        <button className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0" onClick={handleCopyLink}>
          <FontAwesomeIcon icon={icons.copy} className="w-5 h-5" />
        </button>
      </div>
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
        popup && <Popup
          title="Referans ödülü alındı!!"
          message={popupMessage}
          image={'/coins.png'}
          onClose={() => { setPopup(false); setPopupMessage(''); }}
        />
      }

      {/* Toast container for notifications */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar 
        newestOnTop 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </div>
  );
}
