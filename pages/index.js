import React, { useState, useEffect } from "react";
import SignInPage from "./signin";
import ClientDataPage from "./client_data";
import { useSession } from "next-auth/react";
import CryptoDashboard from "./dashboard/crypto";
import { getProviders } from "next-auth/react";
import { getSession } from "next-auth/react";
import axios from "axios";
import Stripe from "stripe";

const HomePage = ({ renderClientDataPage, paymentIntent }) => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();

      setProviders(res);
    })();
  }, []);

  if (renderClientDataPage) return <ClientDataPage paymentIntent={paymentIntent} />;
  return session ? <CryptoDashboard /> : <SignInPage providers={providers} />;
};

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  let renderClientDataPage = false;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: "gbp",
  });

  try {
    if (session && session.user) {
      const host = process.env.NEXTAUTH_URL;
      const user = session.user;
      const userdata = await axios.get(`${host}/api/user`, {
        params: { username: user.email },
      });

      if (userdata && userdata.data && userdata.data.length != 0) {
        const meta = userdata.data[0].meta;
        console.log({ meta });
        const { brand_name, creditCardDetails } = meta;

        if (Array.isArray(brand_name) || Array.isArray(creditCardDetails)) {
          renderClientDataPage = true;
        }
      }
    }
  } catch (error) {
    console.log({ error });
  }
  return {
    props: { renderClientDataPage, paymentIntent },
  };
}
export default HomePage;
