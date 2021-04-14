import React from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import MintCollectionForm from 'components/mint/forms/mint-collection-form';
import MintNftForm from 'components/mint/forms/mint-nft-form';
import SubmitRemarkForm from 'components/mint/forms/submit-remark-form';
import PageContainer from 'components/common/page-container';

const MintPage = () => (
  <PageContainer data-name="mint-page">
    <SimpleGrid mb={16} columns={[1, 1, 2]} spacing={[10, 10, 6]}>
      <MintCollectionForm />
      <SubmitRemarkForm />
    </SimpleGrid>
    <SimpleGrid mb={16} columns={[1, 1, 2]} spacing={[10, 10, 6]}>
      <MintNftForm />
      <SubmitRemarkForm />
    </SimpleGrid>
  </PageContainer>
);

export default MintPage;
