import { db } from 'lib/models/db';
import { Collection, NFT } from 'rmrk-tools';
import { getNumberOfEmotes } from 'lib/models/populate-local-db';
import { NFT as LocalNFT } from '../../lib/models/NFT';
import {
  CollectionConsolidated,
  NFTConsolidated,
} from 'rmrk-tools/dist/tools/consolidator/consolidator';
import { IConsolidatorAdapter } from 'rmrk-tools/dist/tools/consolidator/adapters/types';

export class Adapter implements IConsolidatorAdapter {
  constructor() {}

  public async updateNFTEmote(nft: NFT, consolidatedNFT: NFTConsolidated, updatedAtBlock: number) {
    await db.nfts.update((consolidatedNFT as LocalNFT).snum, {
      reactions: nft?.reactions,
      updatedAtBlock,
    });
    const updatedNFT = await db.nfts.get((consolidatedNFT as LocalNFT).snum);
    return db.nfts.update((consolidatedNFT as LocalNFT).snum, {
      emotenum: getNumberOfEmotes(updatedNFT?.reactions || {}),
    });
  }

  public async updateNFTList(nft: NFT, consolidatedNFT: NFTConsolidated, updatedAtBlock: number) {
    return db.nfts.update((consolidatedNFT as LocalNFT).snum, {
      forsale: nft?.forsale,
      changes: nft?.changes,
      updatedAtBlock,
    });
  }

  public async updateNFTBuy(nft: NFT, consolidatedNFT: NFTConsolidated, updatedAtBlock: number) {
    return db.nfts.update((consolidatedNFT as LocalNFT).snum, {
      owner: nft?.owner,
      changes: nft?.changes,
      forsale: nft?.forsale,
      updatedAtBlock,
    });
  }

  public async updateNFTSend(nft: NFT, consolidatedNFT: NFTConsolidated, updatedAtBlock: number) {
    return db.nfts.update((consolidatedNFT as LocalNFT).snum, {
      changes: nft?.changes,
      forsale: BigInt(0),
      owner: nft?.owner,
      updatedAtBlock,
    });
  }

  public async updateNFTConsume(
    nft: NFT,
    consolidatedNFT: NFTConsolidated,
    updatedAtBlock: number,
  ) {
    return db.nfts.update((consolidatedNFT as LocalNFT).snum, {
      burned: nft?.burned,
      changes: nft?.changes,
      forsale: BigInt(nft.forsale) > BigInt(0) ? BigInt(0) : nft.forsale,
      updatedAtBlock,
    });
  }

  public async updateNFTMint(nft: NFT, updatedAtBlock: number) {
    return db.nfts.put({
      ...nft,
      instance: nft.instance,
      id: `${nft.block}-${nft.collection}-${nft.instance}-${nft.sn}`,
      snum: parseInt((nft.sn as never) as string, 10),
      emotenum: getNumberOfEmotes(nft.reactions),
      updatedAtBlock: nft.updatedAtBlock || updatedAtBlock,
    });
  }

  public async updateCollectionMint(collection: CollectionConsolidated) {
    return db.collections.put(collection);
  }

  public async updateCollectionIssuer(
    collection: Collection,
    consolidatedCollection: CollectionConsolidated,
    updatedAtBlock: number,
  ) {
    return db.collections.update((consolidatedCollection as CollectionConsolidated).id, {
      issuer: collection?.issuer,
      changes: collection?.changes,
      updatedAtBlock,
    });
  }

  public async getNFTById(id: string) {
    return db.nfts.where({ id }).first();
  }

  public async getCollectionById(id: string) {
    return db.collections.where({ id }).first();
  }

  /**
   * Take interaction id, omit block number and split to individual parts
   * To prevent minting a token of the same id in a different block
   */
  public async getNFTByIdUnique(id: string) {
    const interactionId = id.split('-').slice(1).reverse();
    const [sn, instance, ...collectionReversed] = interactionId;
    const collection = collectionReversed.reverse().join('-');
    return db.nfts.where({ collection, instance, snum: parseInt(sn, 10) }).first();
  }
}
