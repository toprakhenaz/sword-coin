import { faCoins, faHourglassStart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({coins,hourlyEarn } : {coins : number,hourlyEarn :number}) => {
  return (
    <div className="text-center">
      <div className="flex flex-row justify-between text-2xl font-bold mb-2 p-4">
        <div>
          <FontAwesomeIcon icon={faCoins} className="text-yellow-400 mr-2"></FontAwesomeIcon>
          <span>{coins}</span>
        </div>
        <div className="text-yellow-300 font-semibold">
          <FontAwesomeIcon icon={faHourglassStart} className="ml-2 mr-1"></FontAwesomeIcon> {hourlyEarn}
        </div>
      </div>
    </div>
  );
};

export default Header;
