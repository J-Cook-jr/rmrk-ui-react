import { NFT } from 'rmrk-tools';
import { isValidEmoji, unifiedToNative } from './unicode-to-emoji';
import { sortByCount } from './sort-by-count';
import {
  IFormattedReaction,
  IFormattedReactionByAccount,
  IFormattedReactionByEmote,
} from 'lib/types';
import { uniq } from 'ramda';

export const formatReactions = (reactions: NFT['reactions']) => {
  const formattedReactions = Object.keys(reactions).map((unicode) =>
    isValidEmoji(unicode) && reactions[unicode].length
      ? {
          emoji: unifiedToNative(unicode),
          count: reactions[unicode].length,
        }
      : null,
  );

  return sortByCount(formattedReactions.filter((reaction) => reaction !== null));
};

/**
 * Format reactions to be displayed in ui to end user in "by account" view
 * @param reactions
 */
export const formatNFTReactionsByAccount = (
  reactions: NFT['reactions'],
): IFormattedReactionByAccount[] => {
  const accounts = Object.values(reactions);
  const allUniqueAccounts = uniq(accounts.reduce((a, b) => [...a, ...b], []));
  const reactionsByAccount = allUniqueAccounts.map((account) => {
    const formattedReactions: IFormattedReaction[] = [];
    Object.keys(reactions).forEach((unicode) => {
      if (
        isValidEmoji(unicode) &&
        reactions[unicode].length &&
        reactions[unicode].includes(account)
      ) {
        formattedReactions.push({
          emoji: unifiedToNative(unicode),
          unicode,
        });
      }
    });

    return { account, reactions: formattedReactions };
  });

  return reactionsByAccount;
};

/**
 * Format reactions to be displayed in ui to end user in "by emote" view
 * @param reactions
 */
export const formatNFTReactionsByEmote = (reactions: NFT['reactions']) => {
  const reactionsByEmote: IFormattedReactionByEmote = [];
  Object.keys(reactions).forEach((unicode) => {
    if (isValidEmoji(unicode) && reactions[unicode].length) {
      reactionsByEmote.push({
        emoji: unifiedToNative(unicode),
        unicode,
        accounts: reactions[unicode],
      });
    }
  });

  return reactionsByEmote;
};
