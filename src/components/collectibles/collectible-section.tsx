import React from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import CollectibleCard from 'components/collectibles/collectible-card';
import { NFT } from 'lib/models/NFT';
import { NFTMetadata } from 'rmrk-tools/dist/rmrk1.0.0/classes/nft';

interface IProps {
  nft: NFT;
  metadata: NFTMetadata | null;
}

const CollectibleSection = ({ nft, metadata }: IProps) => (
  <Box data-name="collectible-section">
    {metadata ? (
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box maxW={482} w="100%">
          <CollectibleCard nft={nft} metadata={metadata} />
        </Box>
      </Box>
    ) : (
      <Box h="100%" display="flex" alignItems="center" justifyContent="center">
        <Spinner color="pink.400" />
      </Box>
    )}
  </Box>
);

export default CollectibleSection;
