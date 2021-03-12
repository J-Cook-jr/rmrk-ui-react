import { Text } from '@chakra-ui/react';
import Page from 'components/common/page';

const Mint = () => {
  const title = 'Mint';

  return (
    <Page title={title} data-name="mint">
      <Text>This page will be a form to mind new NFT on Kusama Remark</Text>
    </Page>
  );
};

export default Mint;
