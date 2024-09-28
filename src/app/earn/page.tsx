'use client';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Earn from '@/components/Earn/Earn';
import { Mission, User } from '@prisma/client';
import SkeletonLoading from '../skeleton/SkeletonEarn';
import { useUserContext } from '../context/UserContext';




interface UserWithMissions extends User {
  missions: Mission[];
}

export default function EarnPage() {
  const [user, setUser] = useState<UserWithMissions | null>(null);
  const { userId, setUserId } = useUserContext();


  const fetchUserData = async (id: number) => {
    try {
      const response = await axios.post('/api/fetch-earn', { userId: id });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
        setUserId(userId);
        fetchUserData(userId);
      } else {
        fetchUserData(1);
      }

  }, []);



  // Kullanıcı verisi yüklenmemişse veya boşsa gösterilecek durum
  if (!user) {
    return <SkeletonLoading />;
  }


  return <Earn user={user} />;
}