import { db } from 'lib/models/db';
import { Interaction } from 'rmrk-tools/dist/tools/types';
import { NFT } from 'rmrk-tools';
import { getNumberOfEmotes } from 'lib/models/populate-local-db';

export class Adapter {
  constructor() {}

  static async updateNFTEmote(nft: NFT, snum: number, updatedAtBlock: number) {
    await db.nfts.update(snum, {
      reactions: nft?.reactions,
      updatedAtBlock,
    });
    const updatedNFT = await db.nfts.get(snum);
    return db.nfts.update(snum, {
      emotenum: getNumberOfEmotes(updatedNFT?.reactions || {}),
    });
  }

  static async updateNFTList(nft: NFT, snum: number, updatedAtBlock: number) {
    return db.nfts.update(snum, { forsale: nft?.forsale, changes: nft?.changes, updatedAtBlock });
  }

  static async updateNFTBuy(nft: NFT, snum: number, updatedAtBlock: number) {
    return db.nfts.update(snum, {
      owner: nft?.owner,
      changes: nft?.changes,
      forsale: nft?.forsale,
      updatedAtBlock,
    });
  }

  static async updateNFTSend(nft: NFT, snum: number, updatedAtBlock: number) {
    return db.nfts.update(snum, {
      owner: nft?.owner,
      changes: nft?.changes,
      forsale: BigInt(nft.forsale) > BigInt(0) ? BigInt(0) : nft.forsale,
      updatedAtBlock,
    });
  }

  static async getNFTFromInteraction(interaction: Interaction) {
    return db.nfts.where({ id: interaction.id }).first();
  }

  /**
   * Take interaction id, omit block number and split to individual parts
   * To prevent minting a token of the same id in a different block
   */
  static async getNFTFromInteractionUnique(interaction: Interaction) {
    const interactionId = interaction.id.split('-').slice(1).reverse();
    const [sn, instance, ...collectionReversed] = interactionId;
    const collection = collectionReversed.reverse().join('-');
    return db.nfts.where({ collection, instance, snum: parseInt(sn, 10) }).first();
  }
}
