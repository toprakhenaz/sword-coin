import { ReactNode } from "react";

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

interface Refferance {
  Id: number;
  refferanceAmount: number;
  isClaimed: boolean;
  previousLig: number; 
}

