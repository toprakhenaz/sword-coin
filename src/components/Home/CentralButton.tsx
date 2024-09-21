import Image from 'next/image';
import { ligImage } from '@/data/GeneralData';


interface CentralButtonProps {
  onClick: () => void; 
  league : number
}



const CentralButton: React.FC<CentralButtonProps> = ({ onClick, league }) => {

  return (
    <div className="flex-grow flex items-center justify-center relative">
      <div className="pulse-ring"></div>
      <button 
        className="central-button" 
        onClick={onClick}
        style={{
          width: '15rem',
          height: '15rem',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '8px solid rgba(255, 69, 0, 0.7)',
          background: 'linear-gradient(135deg, rgba(255, 140, 0, 0.5), rgba(255, 0, 0, 0.5))',
          boxShadow: '0 0 15px rgba(255, 69, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'transform 0.3s ease'
        }}
      >
        <Image src={ ligImage[league]} alt="League 2" width={200} height={200} />
      </button>
    </div>
  );
};

export default CentralButton;
