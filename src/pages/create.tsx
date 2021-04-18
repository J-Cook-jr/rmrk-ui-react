import React from 'react';
import dynamic from 'next/dynamic';
import Page from 'components/common/page';

const MintPage = dynamic(() => import('components/create/create-page'), { ssr: false });

const Create = () => {
  const title = 'Mint';

  return (
    <Page title={title}>
      <MintPage />
    </Page>
  );
};

export default Create;
