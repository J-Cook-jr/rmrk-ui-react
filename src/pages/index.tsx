import React from 'react';
import dynamic from 'next/dynamic';
import Page from 'components/common/page';

const GalleryPage = dynamic(() => import('components/gallery/gallery-page'), { ssr: false });

const Index = () => {
  const title = 'Home';

  return (
    <Page title={title}>
      <GalleryPage />
    </Page>
  );
};

export default Index;
