import SignInPage from "./signin";
import { useSession, signIn, signOut } from "next-auth/react";
import CryptoDashboard from "./dashboard/crypto";
import { getProviders } from "next-auth/react";

const HomePage = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return session ? <CryptoDashboard /> : <SignInPage providers={providers} />;
};

export default HomePage;
