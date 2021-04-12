import React from 'react';
import dynamic from 'next/dynamic';
import Page from 'components/common/page';

const PageHome = dynamic(() => import('components/home/pahe-home'), { ssr: false });

const Index = () => {
  const title = 'RMRK Marketplace';

  return (
    <Page title={title}>
      <PageHome />
    </Page>
  );
};

export default Index;
