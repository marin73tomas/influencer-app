import SignInPage from './signin';
import { useAuth } from '../authentication';
import CryptoDashboard from './dashboard/crypto';





const HomePage = () => {
  const { authUser } = useAuth();
  return authUser ? <CryptoDashboard /> : <SignInPage />;
};

export default HomePage;
