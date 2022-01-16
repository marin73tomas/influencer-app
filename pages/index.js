import React from "react";
import SignInPage from "./signin";
import ClientDataPage from "./client_data";
import { useSession } from "next-auth/react";
import CryptoDashboard from "./dashboard/crypto";
import { getSession } from "next-auth/react";

import renderClientDataPage from "../services/renderClientPage";

const HomePage = ({ renderWrapper }) => {
  const { data: session } = useSession();

  if (renderWrapper) return <ClientDataPage />;

  return session ? <CryptoDashboard /> : <SignInPage />;
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const renderWrapper = await renderClientDataPage(
    session,
    process.env.NEXTAUTH_URL
  );
  return {
    props: { renderWrapper }, // will be passed to the page component as props
  };
}

export default HomePage;
