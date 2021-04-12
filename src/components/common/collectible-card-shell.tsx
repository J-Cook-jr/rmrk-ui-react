import React, { FunctionComponent } from 'react';
import { Badge, Box, Image, useColorMode } from '@chakra-ui/react';
import { NFT } from 'lib/models/NFT';
import EmoteDisplay from 'components/common/emote/emote-display';
import EmoteButton from 'components/common/emote/emote-button';
import { NFTMetadata } from 'rmrk-tools/dist/rmrk1.0.0/classes/nft';

interface IProps {
  nft: NFT;
  metadata: NFTMetadata | null;
  pb?: number;
}

const CollectibleCardShell: FunctionComponent<IProps> = ({ children, nft, metadata, pb }) => {
  const isDark = useColorMode().colorMode === 'dark';
  const { sn } = nft;

  return (
    <Box
      data-name="collectible-card-shell"
      px={4}
      pt={4}
      pb={pb || 4}
      w="100%"
      position="relative"
      borderWidth="1px"
      borderStyle="solid"
      borderColor={isDark ? 'gray.700' : 'gray:100'}
      boxShadow="0 4px 8px 0 rgba(0,0,0,0.2)"
      backgroundColor={isDark ? 'gray.600' : 'gray.50'}
      borderRadius="20px">
      <Box pb="100%" position="relative">
        <Box
          position="absolute"
          left={0}
          top={0}
          w="100%"
          h="100%"
          dispay="flex"
          alignItems="center"
          justifyContent="center">
          <Image
            borderWidth="1px"
            src={metadata?.image || ''}
            maxW="100%"
            maxH="100%"
            w="100%"
            backgroundColor="white"
            borderRadius="20px"
          />
        </Box>
        <Box position="absolute" right={3} top={3}>
          <Badge position="relative" colorScheme="white" fontSize="sm">
            #{sn.slice(-4)}
          </Badge>
        </Box>
        <Box position="absolute" right={2} bottom="0" transform="translateY(50%)" display="flex">
          <Box mr={2}>
            <EmoteDisplay nft={nft} disabled={false} />
          </Box>

          <EmoteButton nft={nft} hideIfNone={false} />
        </Box>
      </Box>
      {children}
    </Box>
  );
};

export default CollectibleCardShell;
