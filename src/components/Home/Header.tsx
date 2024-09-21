import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassStart, faAngleDoubleUp, faCoins } from '@fortawesome/free-solid-svg-icons';

interface headerType {
  earnPerTap : number;
  coinsToLevelUp : number;
  hourlyEarn : number;
}

export default function Header({earnPerTap, coinsToLevelUp, hourlyEarn} : headerType ) {
  return (
    <div className="flex flex-row justify-between py-4 px-8 text-xl font-bold shadow-lg rounded-full" style={{ background: "linear-gradient(to bottom, #281d8a, #302b63, #24243e)" }}>
      <div className="flex flex-col justify-center">
        <p className="text-xs text-orange-400">Hourly Earn</p>
        <div>
          <FontAwesomeIcon icon={faHourglassStart} className="mr-2" />
          <span className="text-xl font-bold text-white">{hourlyEarn}</span>
        </div>
      </div>
      <div className="flex flex-col text-center">
        <p className="text-xs text-green-400">Coins to level up</p>
        <div>
          <FontAwesomeIcon icon={faAngleDoubleUp} className="mr-2" />
          <span>{coinsToLevelUp}</span>
        </div>
      </div>
      <div className="flex flex-col text-center">
        <p className="text-xs text-yellow-400">Earn per Tap</p>
        <div>
          <FontAwesomeIcon icon={faCoins} className="mr-2" />
          <span>+{earnPerTap}</span>
        </div>
      </div>
    </div>
  );
}

