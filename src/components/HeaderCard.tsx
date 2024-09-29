import { Card, CardContent } from './Earn/EarnCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons } from '@/icons';

export default function HeaderCard ({coins , hourlyEarn} : {coins ?: number, hourlyEarn ?: number}) {
  return (
    <Card className="bg-gray-800 mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <FontAwesomeIcon icon={icons.coins} className="text-yellow-400 mr-2 text-2xl" />
            <span className="text-2xl font-bold">{coins}</span>
          </div>
          <div className="flex items-center text-yellow-300">
            <FontAwesomeIcon icon={icons.clock} className="mr-1" />
            <span className="font-semibold text-xl">{hourlyEarn}/h</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
