import { NFT as NFTType } from 'lib/models/NFT';
import { useTransactionStatus } from 'lib/nft/transaction-status';
import { signAndSendRemark } from 'lib/w3/transaction';
import { w3Store } from 'lib/w3/store';
import { consolidatedNFTtoInstance } from 'rmrk-tools/dist/tools/consolidator/utils';

export const listNFT = async (
  price: number,
  localNft: NFTType,
  transactionStatus: ReturnType<typeof useTransactionStatus>,
) => {
  try {
    const { systemProperties } = w3Store.getState();
    if (typeof price !== 'number') {
      throw new Error('Please specify the listing price');
    }

    // Convert indexDB NFT model back to NFT class from rmrk-tools
    const nft = consolidatedNFTtoInstance(localNft);
    if (!nft) {
      throw new Error('Sorry something went wrong');
    }
    // Get back Remark string to be sent on chain
    const priceFormatted =
      price > 0 ? BigInt(Number(`${price}e${systemProperties.tokenDecimals}`)) : 0;
    const remark = nft.list(priceFormatted);
    // Send interaction pending event to block other clients
    await signAndSendRemark({
      remark,
      purchaseTransaction: null,
      transactionStatus,
      pendingMessage: price > 0 ? `Listing your NFT...` : `Delisting your NFT...`,
      successMessage:
        price > 0
          ? `Success! Your NFT "${nft.name}" is now listed for ${price}${systemProperties.tokenSymbol}`
          : `Success! Your NFT "${nft.name}" is not for sale anymore`,
    });
    return;
  } catch (error) {
    console.log(error);
  }
};
