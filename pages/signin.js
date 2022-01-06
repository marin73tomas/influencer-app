import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../@jumbo/components/PageComponents/PageLoader';
import AuthPage from '../authentication/auth-page-wrappers/AuthPage';

const SignIn = dynamic(() => import('../@jumbo/components/Common/authComponents/SignIn'), {
  loading: () => <PageLoader />,
});

const SignInPage = ({ providers }) => (
  <AuthPage>
    <SignIn providers={providers} variant="standard" wrapperVariant="bgColor" />
  </AuthPage>
);

export default SignInPage;
