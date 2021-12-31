import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Wysiwyg = dynamic(() => import('../../../modules/Extensions/Editors/WysiwygEditor'), {
  loading: () => <PageLoader />,
});

const WysiwygPage = () => (
  <SecurePage>
    <Wysiwyg />
  </SecurePage>
);

export default WysiwygPage;
