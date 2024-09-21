'use client'
 
import { usePathname } from 'next/navigation'
import NavbarButton from './NavbarButton';
import { faHome, faUserGroup, faBahtSign, faCoins } from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC = () => {
  const pathname = usePathname() 
  return (
    <div className="flex justify-between rounded-3xl bg-gray-800 p-2 mt-3 overflow-x-scroll">
      <NavbarButton href="/" icon={faHome} label="Home" active={pathname === '/'} />
      <NavbarButton href="/friends" icon={faUserGroup} label="Friends" active={pathname === '/friends'} />
      <NavbarButton href="/mine" icon={faBahtSign} label="Mine" active={pathname === '/mine'} />
      <NavbarButton href="/earn" icon={faCoins} label="Earn" active={pathname === '/earn'} />
    </div>
  );
};

export default Navbar;