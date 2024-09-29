'use client'

import Referral from "@/components/Friends/SwordCoinFriends";
import { Referance, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import axios from "axios";

interface UserWithReferences extends User {
  referances: Referance[];
}

export default function Friends() {
  const [user, setUser] = useState<UserWithReferences | null>(null);
  const [loading, setLoading] = useState(true); // Yükleme durumu
  const { userId, setUserId } = useUserContext();

  const fetchUserData = async (id: number) => {
    try {
      setLoading(true); // Fetch başlamadan önce yüklemeyi başlat
      const response = await axios.post('/api/fetch-friends', { userId: id });
      console.log(response.data);
      setUser(response.data); // Veriyi al
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false); // Fetch işlemi bitince yüklemeyi durdur
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserId(userId);
      fetchUserData(userId);
    } else {
      fetchUserData(1); // Eğer userId mevcut değilse default 1
    }
  }, []);

  // Eğer yükleniyorsa "Loading..." mesajını göster
  if (loading) {
    return <div>Loading...</div>;
  }

  // Eğer user hala null ise, hata durumunu yönetin
  if (!user) {
    return <div>Error fetching user data</div>;
  }

  return (
    <Referral user={user} />
  );
}
