import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import PageLoader from "../../@jumbo/components/PageComponents/PageLoader";
import { useAuth } from "../index";
// eslint-disable-next-line react/prop-types
const AuthPage = ({ children }) => {
  const { setError } = useAuth();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading" && session && session.user) {
      router.push("/dashboard/crypto").then((r) => r);
    }

    return () => setError("");
  }, [session, status]);

  return session && session.user && status === "loading" ? (
    <PageLoader />
  ) : (
    children
  );
};

export default AuthPage;
