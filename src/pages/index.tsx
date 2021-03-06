import dynamic from 'next/dynamic';
import Page from 'components/common/page';

const RMRKInit = dynamic(() => import('components/rmrk-init'), { ssr: false });
const NFTList = dynamic(() => import('components/nft-list/list'), { ssr: false });

const Index = () => {
  const title = 'Home';

  return (
    <Page title={title}>
      <RMRKInit />
      <NFTList />
    </Page>
  );
};

export default Index;
