import React from 'react';
import { Box } from '@chakra-ui/react';
import MintCollectionForm from 'components/mint/forms/mint-collection-form';
import MintNftForm from 'components/mint/forms/mint-nft-form';

const MintPage = () => (
  <Box data-name="mint-page">
    <Box mb={16}>
      <MintCollectionForm />
    </Box>
    <MintNftForm />
  </Box>
);

export default MintPage;
