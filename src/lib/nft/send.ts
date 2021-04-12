import { NFT as NFTType } from 'lib/models/NFT';
import { useTransactionStatus } from 'lib/nft/transaction-status';
import { signAndSendRemark } from 'lib/w3/transaction';
import { isValidAddressPolkadotAddress } from 'lib/utils/validate-polkadot-address';
import { getEncodedAddress } from 'lib/utils/get-encoded-address';
import { polkadotApi } from 'lib/app/get-polkadot-api';
import { consolidatedNFTtoInstance } from 'rmrk-tools/dist/tools/consolidator/utils';

export const send = async (
  localNft: NFTType,
  recipient: string,
  transactionStatus: ReturnType<typeof useTransactionStatus>,
) => {
  try {
    if (!polkadotApi) {
      throw new Error('PolkadotApi is not initialised');
    }

    if (!recipient || !isValidAddressPolkadotAddress(recipient)) {
      throw new Error('No recipient address or recipient address is invalid');
    }

    // Convert indexDB NFT model back to NFT class from rmrk-tools
    const nft = consolidatedNFTtoInstance(localNft);
    if (!nft) {
      throw new Error('Sorry something went wrong');
    }
    const remark = nft.send(getEncodedAddress(recipient));
    // Send interaction pending event to block other clients
    await signAndSendRemark({
      remark,
      purchaseTransaction: null,
      transactionStatus,
      pendingMessage: `Sending your NFT...`,
      successMessage: `Success, the new owner is ${recipient}`,
    });
    return;
  } catch (error) {
    console.log(error);
  }
};
