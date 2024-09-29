import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons } from '@/icons';
import { RefferanceRowProps } from '@/types';

export default function RefferanceRow ({ referance, totalEarned, collectCoins } : RefferanceRowProps ) {
  return (
    <div className="bg-zinc-800 rounded-lg p-3 flex items-center justify-between">
      <div>
        <div className="font-bold">{referance.referancedName}</div>
        <div className="text-sm sm:text-base text-yellow-300 font-semibold">
          <FontAwesomeIcon icon={icons.coins} className="text-yellow-400 ml-1" />
          +{referance.referenceAmount}
        </div>
      </div>
      {referance.isClaimed ? (
        <button className="text-gray-500 font-bold p-2">Collected</button>
      ) : (
        <button className="text-yellow-400 font-bold p-2" onClick={() => collectCoins(referance.referencedId)}>
          Collect
        </button>
      )}
    </div>
  );
};