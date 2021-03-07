import { Text } from '@chakra-ui/react';
import Page from 'components/common/page';
import DarkModeSwitch from 'componentscommon/dark-mode-switch';

const Mint = () => {
  const title = 'Mint';

  return (
    <Page title={title}>
      <Text>This page will be a form to mind new NFT on Kusama Remark</Text>
      <DarkModeSwitch />
    </Page>
  );
};

export default Mint;
