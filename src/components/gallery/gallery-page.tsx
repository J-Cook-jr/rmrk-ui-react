import React from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import PageContainer from 'components/common/page-container';
import NftList from 'components/common/nft/nft-list';

const GalleryPage = () => (
  <Box data-name="gallery-page">
    <PageContainer pt="0">
      {nfts ? (
        <NftList grid={[3, 4, 5, 7]} nfts={nfts} markUnsold />
      ) : (
        <Box h={200} display="flex" alignItems="center" justifyContent="center">
          <Spinner color="pink.400" />
        </Box>
      )}
    </PageContainer>
  </Box>
);

export default GalleryPage;
