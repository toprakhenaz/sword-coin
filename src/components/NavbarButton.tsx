
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

function NavbarButton({ href, icon, label }: { href: string; icon: IconDefinition; label: string }) {
  return (
    <div>
      <Link href={href} passHref>
        <div className="bottom-nav-button w-24 h-24 rounded-3xl m-1 flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300 min-h-[85px] min-w-[85px] cursor-pointer bg-gray-900">
          <FontAwesomeIcon icon={icon} size="xs" className="navbar-icon mb-2 text-yellow-400" style={{ filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.5))' }}/>
          <span className="text-sm font-semibold text-white">{label}</span>
        </div>
      </Link>
    </div>
  );
}

export default NavbarButton;
