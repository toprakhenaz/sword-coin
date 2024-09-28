import { UserProvider } from '../context/UserContext';
import Mine from './MinePage';

export default function MinePage() {
  return (
    <UserProvider>
      <Mine />
    </UserProvider>
  );
}
