import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "@/icons";
import { CardProps } from "@/types";


export default function Card ({ card, onUpgrade , coins} : CardProps) {
  const isDisabled = coins < card.upgradeCost; 
  return (
    <div className="bg-gray-800 rounded-lg p-3 relative flex flex-col justify-between">
      <div>
        <img
          src={card.image}
          alt={card.name}
          className="w-48 h-24 sm:w-20 sm:h-20 mx-auto mb-2 rounded-lg"
        />
        <div className="text-center font-semibold text-sm sm:text-base mb-1">{card.name}</div>
        <div className="text-center text-sm sm:text-base text-yellow-300 font-semibold">
          <FontAwesomeIcon icon={icons.coins} className="text-yellow-400 mr-1" /> +{card.hourlyIncome}/Saat
        </div>
        <div className="mt-2 text-center">
          <span className="text-s sm:text-sm text-gray-400">Seviye {card.level}</span>
        </div>
      </div>
      <button
        onClick={() => onUpgrade(card.id)}
        className={`mt-2 
          upgrade-button ${isDisabled ? 'bg-gray-600 hover:bg-gray-500' : 'bg-green-600 hover:bg-green-500'} text-white rounded-full py-1 px-2 text-xs sm:text-sm flex items-center justify-center  transition-colors duration-300 ` }
        disabled = {isDisabled}
      >
        <FontAwesomeIcon icon={icons.coins} className="ml-1 mr-1 text-lg" /> 
        <span className="text-lg ml-1">{card.upgradeCost}</span>
      </button>
    </div>
  );
};
