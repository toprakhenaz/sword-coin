'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import MainPage from "@/components/Mine/SwordCoinMine";
import { User, UserCardData } from '@prisma/client';
import { TelegramUserdata } from '@/types';
import SkeletonLoading from '../skeleton/SkeletonMine';


interface UserWithCards extends User {
  cards: UserCardData[];
}

export default function Mine() {
  const [user, setUser] = useState<UserWithCards | null>(null);
  const [telegramUser, setTelegramUser] = useState<TelegramUserdata | null>(null);
  const fetchUserData = async (id: number) => {
    try {
      const response = await axios.post('/api/fetch-mine', { userId: id });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const WebApp = require('@twa-dev/sdk'); 
      if (WebApp.initDataUnsafe?.user) {
        const tgUser = WebApp.initDataUnsafe.user;
        setTelegramUser(tgUser as TelegramUserdata);
        console.log("Telegram User Data:", tgUser);
        console.log("Telegram User " , telegramUser);

        fetchUserData(tgUser.id);
      } else {
       
        fetchUserData(1);
      }
    } else {
      fetchUserData(1);
    }
  }, []);



  // Kullanıcı verisi yüklenmemişse veya boşsa gösterilecek durum
  if (!user) {
    return <SkeletonLoading />;
  }


  return <MainPage user={user} />;
}
