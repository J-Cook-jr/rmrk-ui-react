import React from 'react';
import { Box } from '@chakra-ui/react';
import MintCollectionForm from 'components/mint/forms/mint-collection-form';
import MintNftForm from 'components/mint/forms/mint-nft-form';
import SubmitRemarkForm from 'components/mint/forms/submit-remark-form';

const MintPage = () => (
  <Box data-name="mint-page">
    <Box mb={10}>
      <MintCollectionForm />
    </Box>
    <Box mb={16}>
      <SubmitRemarkForm />
    </Box>
    <Box mb={10}>
      <MintNftForm />
    </Box>
    <SubmitRemarkForm />
  </Box>
);

export default MintPage;
