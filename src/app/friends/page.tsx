'use client'

import Referral from "@/components/Friends/SwordCoinFriends";
import { Referance, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import axios from "axios";


interface UserWithReferences extends User {
  references: (Referance & { referencedUser: { league: number } })[];
}


export default function Friends() {
  const [user, setUser] = useState<UserWithReferences |null >(null);
  const { userId, setUserId } = useUserContext();


  const fetchUserData = async (id: number) => {
    try {
      const response = await axios.post('/api/fetch-friends', { userId: id });
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



  return (
    <Referral user = {user}/>
  )
}
