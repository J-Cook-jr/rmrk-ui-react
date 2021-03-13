import React from 'react';
import dynamic from 'next/dynamic';
import Page from 'components/common/page';

const MintPage = dynamic(() => import('components/mint/mint-page'), { ssr: false });

const Mint = () => {
  const title = 'Mint';

  return (
    <Page title={title}>
      <MintPage />
    </Page>
  );
};

export default Mint;
