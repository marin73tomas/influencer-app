import SignInPage from "./signin";
import { useSession, signIn, signOut } from "next-auth/react";
import CryptoDashboard from "./dashboard/crypto";
import { getProviders } from "next-auth/react";


const HomePage = ({ providers }) => {
  const { data: session } = useSession();
  return session ? <CryptoDashboard /> : <SignInPage providers ={providers}/>;
};

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
export default HomePage;
