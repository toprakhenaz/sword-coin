import { ReactNode } from "react";
import { User , Referance} from "@prisma/client";

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
  isGreen : boolean;
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
  refferance: Referance;
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

export interface UserData {
  user: User;
}

export interface TelegramUserdata {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  added_to_attachment_menu?: boolean;
  allows_write_to_pm?: boolean;
}

export interface SpecialOffer {
  id: number;
  title: string;
  reward: number;
  link: string;
  isClaimed?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}