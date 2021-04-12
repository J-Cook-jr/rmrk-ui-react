import { NFT as NFTType } from 'lib/models/NFT';
import { useTransactionStatus } from 'lib/nft/transaction-status';
import { signAndSendRemark } from 'lib/w3/transaction';
import { polkadotApi } from 'lib/app/get-polkadot-api';
import { db } from 'lib/models/db';
import { useAccountsStore } from 'lib/accounts/store';
import { consolidatedNFTtoInstance } from 'rmrk-tools/dist/tools/consolidator/utils';

export const buy = async (
  localNft: NFTType,
  transactionStatus: ReturnType<typeof useTransactionStatus>,
) => {
  try {
    if (!polkadotApi) {
      throw new Error('PolkadotApi is not initialised');
    }
    const { toggleAccountSelectionModal } = useAccountsStore.getState();
    const price = BigInt(localNft.forsale);
    if (!price || price <= BigInt(0)) {
      throw new Error('This NFT is not for sale');
    }

    const account = await db.account.get(0);
    const accountAddress = account?.web3Account?.address || '';
    if (!accountAddress) {
      toggleAccountSelectionModal(true);
      transactionStatus.warning(
        'Kusama address is required',
        'Please select an account in polkadot extension',
      );
      return;
    }

    const {
      data: { free: balanceObject },
    } = await polkadotApi.query.system.account(accountAddress);
    const balance = balanceObject.toBigInt();
    if (balance < BigInt(localNft.forsale)) {
      throw new Error('Sorry your balance is too low');
    }

    // Convert indexDB NFT model back to NFT class from rmrk-tools
    const { block, collection, name, instance, transferable, sn, metadata } = localNft;
    // Get back Remark string to be sent on chain
    const nft = consolidatedNFTtoInstance(localNft);
    if (!nft) {
      throw new Error('Sorry something went wrong');
    }
    const remark = nft.buy();

    const purchaseTransaction = polkadotApi.tx.balances.transfer(nft.owner, price);
    await signAndSendRemark({
      remark,
      purchaseTransaction,
      transactionStatus,
      pendingMessage: `Your purchase is pending...`,
      successMessage: `Congrats! It's yours now!`,
    });
    return;
  } catch (error) {
    transactionStatus.error(error.message);
    console.log(error);
  }
};
