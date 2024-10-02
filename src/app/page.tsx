'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import MainPage from "@/components/Home/SwordCoinMain";
import { TelegramUserdata } from '@/types'; 
import { User } from '@prisma/client';
import SkeletonLoading from './skeleton/SkeletonMain';
import WebApp from '@twa-dev/sdk';
import { useUserContext } from '@/app/context/UserContext';

const defaultTelegramUser: TelegramUserdata = {
  id: 1,
  first_name: 'ali',
  last_name: 'yusuf',
  username: 'ali_yusuf',
  language_code: 'tr',
  allows_write_to_pm: false
};

interface TelegramUserDataType {
  telegramuser: TelegramUserdata;
  startParam: string; 
}

export default function Home() {
  const [user, setUser] = useState<User | null>();
  const [telegramUser, setTelegramUser] = useState<TelegramUserdata | undefined>(undefined);
  const [loading, setLoading] = useState(true); // Yükleme durumu

  const { userId, setUserId } = useUserContext();

  // API'yi çağıran fonksiyon
  const fetchUserData = async ({ telegramuser, startParam }: TelegramUserDataType) => {
    try {
      setLoading(true); // Fetch başlamadan önce yüklemeyi başlat
      console.log('Fetching data for Telegram user:', telegramuser, startParam); 
  
      const response = await axios.post('/api/fetch-user', { TelegramUser: telegramuser, startParam });
      
      if (response.data.success) {
        setUser(response.data.user);
        setUserId(response.data.user.id); // userId'yi burada ayarla
        console.log('Fetched user data:', response.data.user , userId);
      } else {
        // Backend'den gelen hata mesajını burada göster
        alert(response.data.message);
        console.error('Backend error message:', response.data.message);
      }
    } catch (error : any) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Response error:', error.response.data);
      } else if (error.request) {
        // Request was made, but no response received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('Error setting up the request:', error.message);
      }
    } finally {
      setLoading(false); // Fetch işlemi bitince yüklemeyi durdur
    }
  };
  

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('WebApp.initDataUnsafe:', WebApp.initDataUnsafe);  // Gelen veriyi kontrol edin
      if (WebApp.initDataUnsafe?.user) {
        const tgUser = WebApp.initDataUnsafe.user;
        setTelegramUser(tgUser);
        console.log('Telegram', telegramUser);

        fetchUserData({ telegramuser: tgUser,startParam: WebApp.initDataUnsafe.start_param || '' });
      } else {
        console.log("Default çalıştı")
        fetchUserData({ telegramuser: defaultTelegramUser,startParam: '' });
      }
    } else {
      fetchUserData({ telegramuser: defaultTelegramUser, startParam: '' });
    }
  }, []);

  if (loading) {
    return <SkeletonLoading/>;
  }
else{
  //Eğer user hala null ise, hata durumunu yönetin
  if (!user) {
    return <div>Error fetching user data</div>;
  }
}


  return (
    <div>
      <MainPage user={user} />
    </div>
  );
}
