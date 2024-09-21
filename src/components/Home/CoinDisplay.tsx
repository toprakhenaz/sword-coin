import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function CoinDisplay({coins , league , onclick} : {coins : number , league : number, onclick : () => void}) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full py-2 px-4 shadow-md">
        <FontAwesomeIcon icon={faCoins} className="text-yellow-100 mr-2 text-xl" />
        <span className="text-2xl font-bold text-white">{coins}</span>
      </div>
      <button className="flex items-center bg-gradient-to-r from-blue-400 to-blue-600 rounded-full py-2 px-4 shadow-md transform hover:scale-105 transition-transform duration-300" onClick={onclick}>
        <img src='/sword.png' className="text-blue-100 mr-2 text-xl w-5 h-5" />
        <span className="text-lg font-semibold whitespace-nowrap text-white">Lig {league}</span>
        <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-blue-100" />
      </button>
    </div>
  );
}