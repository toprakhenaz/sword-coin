import { FriendsProps} from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons } from '@/icons';

export default function Friends ({ length } : FriendsProps){

  return (
    <>
      <div className="text-center mb-6 mt-6">
        <h1 className="text-3xl font-bold mb-2">{length} Arkadaşlar</h1>
        <p className="text-sm">Bir arkadaş davet et ve bonuslar kazan</p>
      </div>

      <div className="bg-zinc-900 rounded-lg p-4 mb-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-yellow-500 rounded-full mr-3 flex items-center justify-center">
            <div className="w-6 h-6 bg-yellow-300 rounded-full"></div>
          </div>
          <div>
            <p className="text-xs">Arkadaşını davet et</p>
            <p className="text-sm font-bold">Arkadaşın ve Sen 2500 Kazansın</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="text-purple-500 mr-3">
            <FontAwesomeIcon icon={icons.star}  className='w-10 h-10'/>
          </div>
          <div>
            <p className="text-xs">Telegram Premium ile davet et</p>
            <p className="text-sm font-bold">Her davet ettiğinden %10 kazan</p>
          </div>
        </div>
      </div>
    </>
  );
};

