import { NFT as NFTType } from 'lib/models/NFT';
import { useTransactionStatus } from 'lib/nft/transaction-status';
import { signAndSendRemark } from 'lib/w3/transaction';
import { BaseEmoji } from 'emoji-mart/dist-es/utils/emoji-index/nimble-emoji-index';
// @ts-ignore
import emojiUnicode from 'emoji-unicode';
import { isValidEmoji } from 'lib/utils/unicode-to-emoji';
import { db } from 'lib/models/db';
import { getEncodedAddress } from 'lib/utils/get-encoded-address';
import { consolidatedNFTtoInstance } from 'rmrk-tools/dist/tools/consolidator/utils';

const checkIfAlreadyEmoted = async (unicode: string, nft: NFTType) => {
  const account = await db.account.get(0);
  const accountAddress = account?.web3Account?.address || '';
  let alreadyEmoted = false;
  if (accountAddress) {
    const encodedAddress = getEncodedAddress(accountAddress);
    alreadyEmoted = nft.reactions[unicode] && nft.reactions[unicode].includes(encodedAddress);
  }
  return alreadyEmoted;
};

export const sendEmote = async (
  emoji: BaseEmoji,
  localNft: NFTType,
  transactionStatus: ReturnType<typeof useTransactionStatus>,
) => {
  try {
    if (!emoji.native) {
      throw new Error('This Emoji has no unicode');
    }
    const unicode = emojiUnicode(emoji.native).split(' ').join('-');
    const isValid = isValidEmoji(unicode);

    if (!isValid) {
      throw new Error('This Emoji is invalid');
    }

    const alreadyEmoted = await checkIfAlreadyEmoted(unicode, localNft);
    if (alreadyEmoted) {
      transactionStatus.warning(
        `You have already emoted with this reaction ${
          emoji.native || ''
        }, Doing it again will remove it.`,
      );
    }

    // Convert indexDB NFT model back to NFT class from rmrk-tools
    const nft = consolidatedNFTtoInstance(localNft);
    if (!nft) {
      throw new Error('Sorry something went wrong');
    }
    // Get back Remark string to be sent on chain
    const remark = nft.emote(unicode);
    await signAndSendRemark({
      remark,
      purchaseTransaction: null,
      transactionStatus,
      pendingMessage: `${emoji.native || ''} Your reaction is pending...`,
      successMessage: `${emoji.native || ''} Nice! Your birdie will appreciate it`,
    });
    return;
  } catch (error) {
    console.log(error);
  }
};
