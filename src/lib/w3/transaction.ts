import { web3FromAddress } from '@polkadot/extension-dapp';
import { useTransactionStatus } from 'lib/nft/transaction-status';
import { useAccountsStore } from 'lib/accounts/store';
import { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { db } from 'lib/models/db';
import { polkadotApi } from 'lib/app/get-polkadot-api';

interface IProps {
  remark: string;
  transactionStatus: ReturnType<typeof useTransactionStatus>;
  purchaseTransaction?: SubmittableExtrinsic | null;
  pendingMessage?: string;
  errorMessage?: string;
  successMessage?: string;
}

export const signAndSendRemark = async ({
  remark,
  purchaseTransaction,
  transactionStatus,
  pendingMessage,
  successMessage,
}: IProps) => {
  const account = await db.account.get(0);
  const accountAddress = account?.web3Account?.address || '';
  const { toggleAccountSelectionModal: toggleAccountSelectionModal } = useAccountsStore.getState();
  try {
    if (!polkadotApi) {
      throw new Error('PolkadotApi is not initialised');
    }
    if (!accountAddress) {
      toggleAccountSelectionModal(true);
      transactionStatus.warning(
        'Kusama address is required',
        'Please select an account in polkadot extension',
      );
      return;
    }

    const txs = [polkadotApi.tx.system.remark(remark)];
    if (purchaseTransaction) {
      txs.push(purchaseTransaction);
    }

    let acc = await web3FromAddress(accountAddress);

    // If there's more than one transaction then use batchAll, otherwise simpy use first transaction in array created above
    let transactionType = txs.length > 1 ? polkadotApi.tx.utility.batchAll(txs) : txs[0];
    await transactionType.signAndSend(accountAddress, { signer: acc.signer }, (result) => {
      if (result.status.isInBlock) {
        // Block addition is pending
        if (pendingMessage) {
          transactionStatus.inProgress(pendingMessage);
        }
      } else if (result.status.isFinalized) {
        // Block addition is finalised
        if (successMessage) {
          // Display snackbar with success status
          transactionStatus.success(successMessage);
        }
      }
    });
  } catch (error) {
    transactionStatus.reset();

    if (error.message.includes('1010:')) {
      transactionStatus.error('Oops!', 'Inability to pay some fees , e.g. account balance too low');
    }
  }
};
