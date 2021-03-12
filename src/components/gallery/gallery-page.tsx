import React from 'react';
import { Box } from '@chakra-ui/react';
import NFTList from 'components/gallery/nft-list/nft-list';

const GalleryPage = () => (
  <Box data-name="mint-page">
    <NFTList />
  </Box>
);

export default GalleryPage;
