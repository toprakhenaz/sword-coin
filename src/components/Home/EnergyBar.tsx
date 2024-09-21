import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faRocket } from '@fortawesome/free-solid-svg-icons';

export default function EnergyBar({ energy, maxEnergy, boost } : {energy : number ,maxEnergy : number, boost : () => void;}) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex-grow space-y-2">
        <div className="flex justify-between text-lg text-yellow-300 font-bold">
          <span>Energy</span>
          <span>{energy} / {maxEnergy}</span>
        </div>
        <div className="progress-bar rounded-full h-6 relative overflow-hidden shadow-lg p-5" style={{ background: 'rgba(0, 0, 0, 0.3)', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5)' }}>
          <div 
            className="progress absolute top-0 left-0 h-full rounded-full" 
            style={{ 
              width: `${(energy / maxEnergy) * 100}%`,
              background: 'linear-gradient(90deg, #FFA500, #FFD700)',
              transition: 'width 0.3s ease',
              boxShadow: '0 0 15px rgba(255, 215, 0, 0.7)'
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <FontAwesomeIcon icon={faBolt} className="text-yellow-400 text-lg" />
          </div>
        </div>
      </div>
      <button className="boost-button w-12 h-12 bg-gradient-to-r from-purple-400 to-red-500 text-white font-bold rounded-full shadow-lg hover:from-purple-500 hover:to-red-600 transition-all flex items-center justify-center transform scale-110 ml-4" onClick={boost}>
        <FontAwesomeIcon icon={faRocket} className="text-lg" />
      </button>
    </div>
  );
}