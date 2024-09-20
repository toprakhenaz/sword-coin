import NavbarButton from './NavbarButton';
import { faHome, faUserGroup, faBahtSign, faCoins } from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC = () => {
  return (
    <div className="flex justify-between rounded-3xl bg-gray-800 p-2">
      <NavbarButton href="/" icon={faHome} label="Home" />
      <NavbarButton href="/friends" icon={faUserGroup} label="Friends" />
      <NavbarButton href="/mine" icon={faBahtSign} label="Mine" />
      <NavbarButton href="/earn" icon={faCoins} label="Earn" />
    </div>
  );
};

export default Navbar;
