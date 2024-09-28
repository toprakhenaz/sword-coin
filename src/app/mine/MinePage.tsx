'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import MainPage from "@/components/Mine/SwordCoinMine";
import { User, UserCardData } from '@prisma/client';
import SkeletonLoading from '../skeleton/SkeletonMine';
import { useUserContext } from '../context/UserContext';



interface UserWithCards extends User {
  cards: UserCardData[];
}

export default function Mine() {
  const [user, setUser] = useState<UserWithCards | null>(null);
  const { userId, setUserId } = useUserContext();

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
        setUserId(userId);
        fetchUserData(userId);
    }else {
        fetchUserData(1);
      }
  }, []);


  if (!user) {
    return <SkeletonLoading />;
  }


  return <MainPage user={user} />;
}
