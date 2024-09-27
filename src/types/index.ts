import { ReactNode } from "react";
import { User } from "@prisma/client";

export interface CentralButtonProps {
  onClick: () => void; 
  league : number
}

export interface CoinDisplayProps {
  coins : number , 
  league : number, 
  onclick : () => void
}

export interface EnergyBarProps {
  energy : number ,
  maxEnergy : number,
  boost : () => void;
}

export interface HeaderProps {
  earnPerTap : number;
  coinsToLevelUp : number;
  hourlyEarn : number;
}

export interface LeagueOverlayProps {
  onClose: () => void;
  coins: number;  
}

export interface BottomNavProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export interface CardProps {
  card: CardData;
  onUpgrade: (id: number) => void;
  coins : number;
}

export interface ConfirmationPopupProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface TimerBarProps {
  dailyCombo: number[];
  foundCards: number[]; 
}

export interface AlertProps {
  children: React.ReactNode;
}

export interface EarnCardProps {
  className?: string;
  children: ReactNode;
}

export interface ProgressProps {
  value: number;
  className?: string;
}

export interface RefferanceRowProps {
  refferance: Refferance;
  totalEarned: number;
  collectCoins: (refId: number) => void;
}

export interface FriendsProps {
  length: number;
}

export interface CardData {
  id: number;
  name: string;
  image: string;
  hourlyIncome: number;
  level: number;
  upgradeCost: number;
  category: string;
}

interface UserCardData {
  id: number;    
  level: number; 
}

interface Refferance {
  Id: number;
  refferanceAmount: number;
  isClaimed: boolean;
  previousLig: number; 
}

export interface SUser {
  userName: string;    
  userId: number;  
  coins: number;       
  energy: number;      
  maxEnergy: number;   
  lig: number;          
  hourlyEarn: number; 
  earnPerTap: number;   
  lastBoostTime: Date; 
  dailyBoostCount: number; 
  cards:  UserCardData[];  
  dailyCombo: number[];
  foundCards: number[];
  refferances: Refferance[];  
}

export interface UserData {
  user: User;
}