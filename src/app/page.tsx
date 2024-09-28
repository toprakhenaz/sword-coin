'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import MainPage from "@/components/Home/SwordCoinMain";
import { TelegramUserdata } from '@/types'; 
import { User } from '@prisma/client';
import SkeletonLoading from './skeleton/SkeletonMain';
import WebApp from '@twa-dev/sdk';  // `require` yerine `import` kullanıyoruz
import { useUserContext } from '@/app/context/UserContext';



const defaultTelegramUser = {
  id: 1,
  first_name: 'ali',
  last_name: 'yusuf',
  username: 'ali_yusuf',
  language_code: 'tr',
  is_premium: false,
  added_to_attachment_menu: false,
  allows_write_to_pm: false

}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [telegramUser, setTelegramUser] = useState<TelegramUserdata | undefined>(undefined);
  const { userId, setUserId } = useUserContext();
 

  const fetchUserData = async (telegramuser: TelegramUserdata) => {
    try {
      const response = await axios.post('/api/fetch-user', { TelegramUser: telegramuser });
      setUser(response.data);
      if (response.data) {
        setUserId(response.data.id); // userId'yi burada ayarla
      }
      else{
        setUserId(userId);
      }

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (WebApp.initDataUnsafe?.user) {
        const tgUser = WebApp.initDataUnsafe.user;
        setTelegramUser(tgUser as TelegramUserdata);
        console.log("Telegram User Data:", tgUser);
        console.log("Telegram User " , telegramUser);

        fetchUserData(tgUser);
      } else {
       
        fetchUserData(defaultTelegramUser);
      }
    } else {
      fetchUserData(defaultTelegramUser);
    }
  }, []);
  if (!user) {
    return <SkeletonLoading />;
  }

  return (
    <div>
      <MainPage user={user}></MainPage>
    </div>
  );
}
