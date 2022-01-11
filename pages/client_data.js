import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../@jumbo/components/PageComponents/PageLoader';
import AuthPage from '../authentication/auth-page-wrappers/AuthPage';

const ClientData = dynamic(
  () => import("../@jumbo/components/Common/authComponents/ClientData"),
  {
    loading: () => <PageLoader />,
  }
);

const ClientDataPage = ({ paymentIntent }) => (
  <AuthPage>
    <ClientData
      paymentIntent={paymentIntent}
      variant="standard"
      wrapperVariant="bgColor"
    />
  </AuthPage>
);

export default ClientDataPage;