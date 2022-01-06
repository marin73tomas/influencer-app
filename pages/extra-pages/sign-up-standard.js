import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';
import { getProviders } from "next-auth/react";

const SignupStandard = dynamic(() => import('../../modules/ExtraPages/sign-up/Standard'), {
  loading: () => <PageLoader />,
});

const SignupStandardPage = ({ providers }) => (
  <SecurePage>
    <SignupStandard providers={providers} />
  </SecurePage>
);


export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
export default SignupStandardPage;
