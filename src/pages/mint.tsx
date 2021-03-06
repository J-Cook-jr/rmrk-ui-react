import { Text } from '@chakra-ui/react';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import Page from '../components/common/page';
import dynamic from 'next/dynamic';

const RMRKInit = dynamic(() => import('../components/rmrk-init'), { ssr: false });

const Mint = () => {
  const title = 'Mint';

  return (
    <Page title={title}>
      <Text>This page will be a form to mind new NFT on Kusama Remark</Text>
      <RMRKInit />
      <DarkModeSwitch />
    </Page>
  );
};

export default Mint;
