import dynamic from 'next/dynamic';
import Page from 'components/common/page';

const NFTList = dynamic(() => import('components/nft-list/nft-list'), { ssr: false });

const Index = () => {
  const title = 'Home';

  return (
    <Page title={title}>
      <NFTList />
    </Page>
  );
};

export default Index;
