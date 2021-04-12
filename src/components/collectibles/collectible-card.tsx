import React from 'react';
import { Box, Divider, Link } from '@chakra-ui/react';
import { NFT } from 'lib/models/NFT';
import NextLink from 'next/link';
import { Tooltip } from '@chakra-ui/react';
import CollectibleCardShell from 'components/common/collectible-card-shell';
import { getEncodedAddress } from 'lib/utils/get-encoded-address';
import { usePolkadotIdentity } from 'lib/hooks';
import { NFTMetadata } from 'rmrk-tools/dist/rmrk1.0.0/classes/nft';
import { useTranslation } from 'next-i18next';

interface IProps {
  nft: NFT;
  metadata: NFTMetadata | null;
}

const CollectibleCard = ({ nft, metadata }: IProps) => {
  const { t } = useTranslation('common');
  const { owner } = nft;
  const ownerAddressEncoded = getEncodedAddress(owner);
  const { userName } = usePolkadotIdentity(ownerAddressEncoded);

  return (
    <Box>
      <CollectibleCardShell nft={nft} metadata={metadata}>
        <Box pt={4}>
          <NextLink href={`/nest/${ownerAddressEncoded}`}>
            <Link fontSize="sm" color="pink.500">
              {t('view-owner-page')}
            </Link>
          </NextLink>
          <Tooltip label={`#${nft.id}`}>
            <Box mt={2} w="100%" display="flex" alignItems="center">
              <Box fontFamily="mono" mr={1}>
                {t('id')}:
              </Box>
              <Box fontSize="xs" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                {nft.id}
              </Box>
            </Box>
          </Tooltip>
          <Box py={1}>
            <Divider />
          </Box>
          <Box display="flex" alignItems="center">
            <Box fontFamily="mono" mr={1}>
              {t('owner')}:{' '}
            </Box>
            <Link
              href={`https://kusama.subscan.io/account/${ownerAddressEncoded}`}
              isExternal
              fontSize="xs"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap">
              <Tooltip label={ownerAddressEncoded}>{userName}</Tooltip>
            </Link>
          </Box>
        </Box>
      </CollectibleCardShell>
    </Box>
  );
};

export default CollectibleCard;
