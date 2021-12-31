import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const KanbanBoard = dynamic(() => import('../../modules/Apps/KanbanBoard'), {
  loading: () => <PageLoader />,
});

const KanbanBoardPage = () => (
  <SecurePage>
    <KanbanBoard />
  </SecurePage>
);

export default KanbanBoardPage;
