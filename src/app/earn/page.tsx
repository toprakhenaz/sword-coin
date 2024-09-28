import { UserProvider } from '../context/UserContext';
import Earn from './EarnPage';

export default function MinePage() {
  return (
    <UserProvider>
      <Earn />
    </UserProvider>
  );
}
