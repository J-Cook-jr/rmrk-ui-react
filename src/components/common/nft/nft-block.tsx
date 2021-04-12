import React, { useEffect, useState, memo } from 'react';
import { Box, Image, Badge } from '@chakra-ui/react';
import { Tooltip } from '@chakra-ui/react';
import { NFT } from 'lib/models/NFT';
import Link from 'next/link';
import { fetchIpfsMetadata } from 'lib/utils/ipfs/utils';
import { arePropsEqual } from 'lib/utils';
import EmoteDisplay from 'components/common/emote/emote-display';
import { NFTMetadata } from 'rmrk-tools/dist/rmrk1.0.0/classes/nft';
import { useTranslation } from 'next-i18next';

interface IProps {
  nft: NFT;
}

const NftBlock = ({ nft, nft: { id, sn, owner, instance } }: IProps) => {
  const { t } = useTranslation('common');
  const [metadata, setMetadata] = useState<NFTMetadata | null>();

  useEffect(() => {
    const getImg = async () => {
      const response = await fetchIpfsMetadata(nft);

      setMetadata(response);
    };

    getImg();
  }, [nft]);

  return (
    <Box>
      <Link href={`/collectibles/${id}`} passHref>
        <a>
          <Tooltip label={t(`nft-block-tooltip-${instance}`)}>
            <Box
              role="group"
              position="relative"
              pb="100%"
              data-name="ntf-block"
              boxShadow="0 4px 8px 0 rgba(0,0,0,0.2)"
              borderRadius="5px"
              transition="transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)"
              backgroundColor="white"
              sx={{
                WebkitBackfaceVisibility: 'hidden',
                WebkitTransform: 'perspective(1000px)',
              }}
              _hover={{
                transform: 'scale(1.1, 1.1)',
              }}>
              <Box
                position="absolute"
                zIndex="-1"
                w="100%"
                h="100%"
                opacity="0.5"
                borderRadius="5px"
                boxShadow="0 5px 15px rgba(0,0,0,0.3)"
                transition="opacity 0.3s ease-in-out"
                _groupHover={{ opacity: 1 }}
              />
              <Box
                position="absolute"
                left="0"
                top="0"
                w="100%"
                h="100%"
                display="flex"
                alignItems="center"
                justifyContent="center">
                <Image position="relative" src={metadata?.image || ''} w="85%" />
              </Box>
              <Box position="absolute" right={1} bottom="5px" transform="translateY(50%)">
                <EmoteDisplay nft={nft} size="sm" disabled />
              </Box>

              <Box position="absolute" right={1} top={1}>
                <Badge position="relative" colorScheme="white">
                  #{sn.slice(-4)}
                </Badge>
              </Box>
            </Box>
          </Tooltip>
        </a>
      </Link>
    </Box>
  );
};

export default memo(NftBlock, arePropsEqual);
