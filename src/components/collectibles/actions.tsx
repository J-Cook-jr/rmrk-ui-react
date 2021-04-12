import React from 'react';
import { Box } from '@chakra-ui/react';
import ContentContainer from 'components/common/content-container';
import ContentHeading from 'components/collectibles/content-heading';
import ClaimButton from 'components/collectibles/claim-button/claim-button';
import Send from 'components/collectibles/send';
import List from 'components/collectibles/list';
import { NFT } from 'lib/models/NFT';
import { getEncodedAddress } from 'lib/utils/get-encoded-address';
import { useEncodedUserAddress } from 'lib/accounts/use-encoded-address';
import { useTranslation } from 'next-i18next';

interface IProps {
  nft: NFT;
  interactionPending: boolean;
}

const Actions = ({ nft, interactionPending }: IProps) => {
  const { t } = useTranslation('collectibles');
  const { owner } = nft;
  const userAddressEncoded = useEncodedUserAddress();
  const ownerAddressEncoded = getEncodedAddress(owner);
  const isOwned = ownerAddressEncoded === userAddressEncoded;

  return (
    <ContentContainer>
      <ContentHeading pb={4}>{t('actions')}</ContentHeading>
      {isOwned ? (
        <Box display="flex" alignItems="center">
          <Box mr={4}>
            <Send nft={nft} someoneInteractingWithNFT={interactionPending} />
          </Box>
          <List nft={nft} someoneInteractingWithNFT={interactionPending} />
        </Box>
      ) : (
        <ClaimButton nft={nft} someoneInteractingWithNFT={interactionPending} />
      )}
    </ContentContainer>
  );
};

export default Actions;
