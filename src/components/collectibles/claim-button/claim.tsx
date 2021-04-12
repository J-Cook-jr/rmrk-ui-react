import React from 'react';
import { Button, Link } from '@chakra-ui/react';
import { NFT } from 'lib/models/NFT';
import { formatPrice } from 'lib/utils/format-price';
import { useDexieStore } from 'lib/dexie/store';
import { buy } from 'lib/nft/buy';
import { useTransactionStatus } from 'lib/nft/transaction-status';
import { w3Store } from 'lib/w3/store';
import { useTranslation } from 'next-i18next';

interface IProps {
  nft: NFT;
  someoneInteractingWithNFT: boolean;
}

const ClaimButton = ({ nft, someoneInteractingWithNFT }: IProps) => {
  const { t } = useTranslation('collectibles');
  const { isBlocksSynced } = useDexieStore((state) => ({ isBlocksSynced: state.isBlocksSynced }));
  const { systemProperties } = w3Store((state) => ({
    systemProperties: state.systemProperties,
  }));
  const transactionStatus = useTransactionStatus('buy');

  const isListed = nft.forsale > BigInt(0) ? nft.forsale.toString() : false;
  const price = `${formatPrice(BigInt(nft.forsale), systemProperties, true)}`;

  const startPurchase = () => {
    buy(nft, transactionStatus);
  };

  const isDisabled =
    !isListed || !isBlocksSynced || transactionStatus.loading || someoneInteractingWithNFT;

  const buttonCopy = isListed ? `${t('buy')} ${price}` : t('no-sale');

  return (
    <Button
      isLoading={!isBlocksSynced || transactionStatus.loading || someoneInteractingWithNFT}
      colorScheme="green"
      size="sm"
      onClick={startPurchase}
      disabled={true}
      // disabled={isDisabled}
    >
      {buttonCopy}
    </Button>
  );
};

export default ClaimButton;
