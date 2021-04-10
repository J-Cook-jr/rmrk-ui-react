import {
  buyInteraction,
  changeIssuerInteraction,
  Collection,
  consumeInteraction,
  emoteInteraction,
  listForSaleInteraction,
  NFT,
  sendInteraction,
  validateMintIds,
  validateMintNFT,
} from 'rmrk-tools';
import { Send } from 'rmrk-tools/dist/rmrk1.0.0/classes/send';
import { List } from 'rmrk-tools/dist/rmrk1.0.0/classes/list';
import { Consume } from 'rmrk-tools/dist/rmrk1.0.0/classes/consume';
import { Buy } from 'rmrk-tools/dist/rmrk1.0.0/classes/buy';
import { Emote } from 'rmrk-tools/dist/rmrk1.0.0/classes/emote';
import { ChangeIssuer } from 'rmrk-tools/dist/rmrk1.0.0/classes/changeissuer';
import { Remark } from 'rmrk-tools/dist/tools/consolidator/remark';
import { Interaction } from 'rmrk-tools/dist/tools/types';
import { OP_TYPES } from 'rmrk-tools/dist/tools/constants';
import { getCollectionFromRemark } from 'rmrk-tools/dist/tools/consolidator/interactions/mint';
import { getChangeIssuerEntity } from 'rmrk-tools/dist/tools/consolidator/interactions/changeIssuer';
import { deeplog } from 'rmrk-tools/dist/tools/utils';
import { NFT as LocalNFT } from '../../lib/models/NFT';
import { Adapter } from 'lib/models/adapter';
import { w3Store } from 'lib/w3/store';
import { ConsolidatorReturnType } from 'rmrk-tools/dist/tools/consolidator/consolidator';

export const localNFTtoNFTInstance = (nft: LocalNFT): NFT => {
  const { block, collection, name, instance, transferable, sn, metadata, snum, id, ...rest } =
    nft || {};
  const nftClass = new NFT(block, collection, name, instance, transferable, sn, metadata);
  const { owner, forsale, reactions, changes, loadedMetadata, burned } = rest;
  nftClass.owner = owner;
  nftClass.forsale = forsale;
  nftClass.reactions = reactions;
  nftClass.changes = changes;
  nftClass.loadedMetadata = loadedMetadata;
  nftClass.burned = burned;

  return nftClass;
};

export class Consolidator {
  private invalidCalls: InvalidCall[];
  private collections: Collection[];
  private nfts: NFT[];
  private useDBAdapter: Boolean;
  constructor() {
    this.invalidCalls = [];
    this.collections = [];
    this.nfts = [];
    this.useDBAdapter = true;
  }
  private findExistingCollection(id: string) {
    return this.collections.find((el) => el.id === id);
  }

  // TODO: remove and use getNFTFromInteractionUnique
  private findExistingNFT(interaction: Interaction): NFT | undefined {
    return this.nfts.find((el) => {
      const idExpand1 = el.getId().split('-');
      idExpand1.shift();
      const uniquePart1 = idExpand1.join('-');

      const idExpand2 = interaction.id.split('-');
      idExpand2.shift();
      const uniquePart2 = idExpand2.join('-');

      return uniquePart1 === uniquePart2;
    });
  }

  /**
   * Find NFT by compare id on the blockless part
   * To prevent minting a token of the same id in a different block
   */
  private async getNFTFromInteractionUnique(interaction: Interaction) {
    return this.useDBAdapter
      ? await Adapter.getNFTFromInteractionUnique(interaction)
      : this.nfts.find((nft) => {
          const uniquePart1 = nft.getId().split('-').slice(1).join('-');
          const uniquePart2 = interaction.id.split('-').slice(1).join('-');
          return uniquePart1 === uniquePart2;
        });
  }

  private async getNFTFromInteractionId(interaction: Interaction) {
    return this.useDBAdapter
      ? await Adapter.getNFTFromInteraction(interaction)
      : this.nfts.find((el) => el.getId() === interaction.id);
  }

  private updateInvalidCalls(op_type: OP_TYPES, remark: Remark) {
    const invalidCallBase: Partial<InvalidCall> = {
      op_type,
      block: remark.block,
      caller: remark.caller,
    };
    return function update(this: Consolidator, object_id: string, message: string) {
      this.invalidCalls.push({
        ...invalidCallBase,
        object_id,
        message,
      } as InvalidCall);
    };
  }

  /**
   * The MINT interaction creates an NFT collection.
   * https://github.com/rmrk-team/rmrk-spec/blob/master/standards/rmrk1.0.0/interactions/mint.md
   */
  private mint(remark: Remark): boolean {
    const invalidate = this.updateInvalidCalls(OP_TYPES.MINT, remark).bind(this);

    let collection;
    try {
      collection = getCollectionFromRemark(remark);
    } catch (e) {
      invalidate(remark.remark, e.message);
      return true;
    }

    if (this.findExistingCollection(collection.id)) {
      invalidate(collection.id, `[${OP_TYPES.MINT}] Attempt to mint already existing collection`);
      return true;
    }

    try {
      validateMintIds(collection, remark);
    } catch (e) {
      invalidate(collection.id, e.message);
      return true;
    }

    // this.collections.push(collection);
    return false;
  }

  /**
   * The MINT interaction creates an NFT inside of a Collection.
   * https://github.com/rmrk-team/rmrk-spec/blob/master/standards/rmrk1.0.0/interactions/mintnft.md
   */
  private mintNFT(remark: Remark): boolean {
    const invalidate = this.updateInvalidCalls(OP_TYPES.MINTNFT, remark).bind(this);
    const nft = NFT.fromRemark(remark.remark, remark.block);

    if (typeof nft === 'string') {
      invalidate(remark.remark, `[${OP_TYPES.MINTNFT}] Dead before instantiation: ${nft}`);
      return true;
    }

    // TODO: remove and use getNFTFromInteractionUnique
    const existsCheck = this.nfts.find((el) => {
      const idExpand1 = el.getId().split('-');
      idExpand1.shift();
      const uniquePart1 = idExpand1.join('-');

      const idExpand2 = nft.getId().split('-');
      idExpand2.shift();
      const uniquePart2 = idExpand2.join('-');

      return uniquePart1 === uniquePart2;
    });

    if (existsCheck) {
      invalidate(nft.getId(), `[${OP_TYPES.MINTNFT}] Attempt to mint already existing NFT`);
      return true;
    }

    const nftParentCollection = this.findExistingCollection(nft.collection);
    try {
      validateMintNFT(remark, nft, nftParentCollection);
      this.nfts.push(nft);
    } catch (e) {
      invalidate(nft.getId(), e.message);
      return true;
    }

    return false;
  }

  /**
   * Send an NFT to an arbitrary recipient.
   * You can only SEND an existing NFT (one that has not been CONSUMEd yet).
   * https://github.com/rmrk-team/rmrk-spec/blob/master/standards/rmrk1.0.0/interactions/send.md
   */
  private async send(remark: Remark): Promise<boolean> {
    const invalidate = this.updateInvalidCalls(OP_TYPES.SEND, remark).bind(this);

    const sendEntity = Send.fromRemark(remark.remark);

    if (typeof sendEntity === 'string') {
      invalidate(remark.remark, `[${OP_TYPES.SEND}] Dead before instantiation: ${sendEntity}`);
      return true;
    }

    const localNFT = await this.getNFTFromInteractionUnique(sendEntity);
    if (!localNFT) {
      return true;
    }
    const nft = localNFTtoNFTInstance(localNFT as LocalNFT);

    try {
      sendInteraction(remark, sendEntity, nft);
      if (this.useDBAdapter) {
        await Adapter.updateNFTSend(nft, (localNFT as LocalNFT).snum, remark.block);
      }
    } catch (e) {
      invalidate(sendEntity.id, e.message);
      return true;
    }

    return false;
  }

  /**
   * A LIST interaction lists an NFT as available for sale. The NFT can be instantly purchased.
   * A listing can be canceled, and is automatically considered canceled when a BUY is executed on top of a given LIST.
   * You can only LIST an existing NFT (one that has not been CONSUMEd yet).
   * https://github.com/rmrk-team/rmrk-spec/blob/master/standards/rmrk1.0.0/interactions/list.md
   */
  private async list(remark: Remark): Promise<boolean> {
    const invalidate = this.updateInvalidCalls(OP_TYPES.LIST, remark).bind(this);

    const listEntity = List.fromRemark(remark.remark);
    if (typeof listEntity === 'string') {
      invalidate(remark.remark, `[${OP_TYPES.LIST}] Dead before instantiation: ${listEntity}`);
      return true;
    }

    const localNFT = await this.getNFTFromInteractionUnique(listEntity);
    if (!localNFT) {
      return true;
    }
    const nft = localNFTtoNFTInstance(localNFT as LocalNFT);

    try {
      listForSaleInteraction(remark, listEntity, nft);
      if (this.useDBAdapter) {
        await Adapter.updateNFTList(nft, (localNFT as LocalNFT).snum, remark.block);
      }
    } catch (e) {
      invalidate(listEntity.id, e.message);
      return true;
    }

    return true;
  }

  /**
   * The CONSUME interaction burns an NFT for a specific purpose.
   * This is useful when NFTs are spendable like with in-game potions, one-time votes in DAOs, or concert tickets.
   * You can only CONSUME an existing NFT (one that has not been CONSUMEd yet).
   * https://github.com/rmrk-team/rmrk-spec/blob/master/standards/rmrk1.0.0/interactions/consume.md
   */
  private consume(remark: Remark): boolean {
    const invalidate = this.updateInvalidCalls(OP_TYPES.CONSUME, remark).bind(this);

    const consumeEntity = Consume.fromRemark(remark.remark);
    // Check if consume is valid
    if (typeof consumeEntity === 'string') {
      invalidate(
        remark.remark,
        `[${OP_TYPES.CONSUME}] Dead before instantiation: ${consumeEntity}`,
      );
      return true;
    }

    // Find the NFT in state
    const nft = this.findExistingNFT(consumeEntity);
    try {
      consumeInteraction(remark, consumeEntity, nft);
    } catch (e) {
      invalidate(consumeEntity.id, e.message);
      return true;
    }

    return true;
  }

  /**
   * The BUY interaction allows a user to immediately purchase an NFT listed for sale using the LIST interaction,
   * as long as the listing hasn't been canceled.
   * You can only BUY an existing NFT (one that has not been CONSUMEd yet).
   * https://github.com/rmrk-team/rmrk-spec/blob/master/standards/rmrk1.0.0/interactions/buy.md
   */
  private async buy(remark: Remark): Promise<boolean> {
    const invalidate = this.updateInvalidCalls(OP_TYPES.BUY, remark).bind(this);

    const buyEntity = Buy.fromRemark(remark.remark);
    if (typeof buyEntity === 'string') {
      invalidate(remark.remark, `[${OP_TYPES.BUY}] Dead before instantiation: ${buyEntity}`);
      return true;
    }

    const localNFT = await this.getNFTFromInteractionUnique(buyEntity);
    if (!localNFT) {
      return true;
    }
    const nft = localNFTtoNFTInstance(localNFT as LocalNFT);

    try {
      const { systemProperties } = w3Store.getState();
      buyInteraction(remark, buyEntity, nft, systemProperties.ss58Format);
      if (this.useDBAdapter) {
        await Adapter.updateNFTBuy(nft, (localNFT as LocalNFT).snum, remark.block);
      }
    } catch (e) {
      invalidate(buyEntity.id, e.message);
      return true;
    }

    return true;
  }

  /**
   * React to an NFT with an emoticon.
   * You can only EMOTE on an existing NFT (one that has not been CONSUMEd yet).
   * https://github.com/rmrk-team/rmrk-spec/blob/master/standards/rmrk1.0.0/interactions/emote.md
   */
  private async emote(remark: Remark): Promise<boolean> {
    const invalidate = this.updateInvalidCalls(OP_TYPES.EMOTE, remark).bind(this);
    const emoteEntity = Emote.fromRemark(remark.remark);
    if (typeof emoteEntity === 'string') {
      invalidate(remark.remark, `[${OP_TYPES.EMOTE}] Dead before instantiation: ${emoteEntity}`);
      return true;
    }
    const localNFT = await this.getNFTFromInteractionId(emoteEntity);
    if (!localNFT) {
      return true;
    }
    const nft = localNFTtoNFTInstance(localNFT as LocalNFT);

    try {
      emoteInteraction(remark, emoteEntity, nft);
      if (this.useDBAdapter && remark.block !== (localNFT as LocalNFT).updatedAtBlock) {
        await Adapter.updateNFTEmote(nft, (localNFT as LocalNFT).snum, remark.block);
      }
    } catch (e) {
      invalidate(emoteEntity.id, e.message);
      return true;
    }

    return false;
  }

  /**
   * The CHANGEISSUER interaction allows a collection issuer to change the issuer field to another address.
   * The original issuer immediately loses all rights to mint further NFTs inside that collection.
   * This is particularly useful when selling the rights to a collection's operation
   * or changing the issuer to a null address to relinquish control over it.
   * https://github.com/rmrk-team/rmrk-spec/blob/master/standards/rmrk1.0.0/interactions/changeissuer.md
   */
  private changeIssuer(remark: Remark): boolean {
    const invalidate = this.updateInvalidCalls(OP_TYPES.CHANGEISSUER, remark).bind(this);

    let changeIssuerEntity: ChangeIssuer;
    try {
      changeIssuerEntity = getChangeIssuerEntity(remark);
    } catch (e) {
      invalidate(remark.remark, e.message);
      return true;
    }

    const collection = this.collections.find((el: Collection) => el.id === changeIssuerEntity.id);
    try {
      changeIssuerInteraction(remark, changeIssuerEntity, collection);
    } catch (e) {
      invalidate(changeIssuerEntity.id, e.message);
      return true;
    }

    return false;
  }

  public async consolidate(rmrks?: Remark[]): Promise<ConsolidatorReturnType> {
    const remarks = rmrks || [];
    //console.log(remarks);
    for (const remark of remarks) {
      // console.log('==============================');
      // console.log('Remark is: ' + remark.remark);
      switch (remark.interaction_type) {
        // case OP_TYPES.MINT:
        //   if (this.mint(remark)) {
        //     continue;
        //   }
        //   break;
        //
        // case OP_TYPES.MINTNFT:
        //   if (this.mintNFT(remark)) {
        //     continue;
        //   }
        //   break;
        //
        case OP_TYPES.SEND:
          if (this.send(remark)) {
            continue;
          }
          break;

        case OP_TYPES.BUY:
          // An NFT was bought after being LISTed
          if (this.buy(remark)) {
            continue;
          }
          break;
        //
        // case OP_TYPES.CONSUME:
        //   // An NFT was burned
        //   if (this.consume(remark)) {
        //     continue;
        //   }
        //   break;
        //
        case OP_TYPES.LIST:
          // An NFT was listed for sale
          if (this.list(remark)) {
            continue;
          }
          break;

        case OP_TYPES.EMOTE:
          if (await this.emote(remark)) {
            continue;
          }
          break;

        // case OP_TYPES.CHANGEISSUER:
        //   if (this.changeIssuer(remark)) {
        //     continue;
        //   }
        //   break;

        default:
          console.error('Unable to process this remark - wrong type: ' + remark.interaction_type);
      }
    }
    // deeplog(this.nfts);
    // deeplog(this.collections);

    //console.log(this.invalidCalls);
    // console.log(`${this.nfts.length} NFTs across ${this.collections.length} collections.`);
    // console.log(`${this.invalidCalls.length} invalid calls.`);
    return {
      nfts: this.nfts,
      collections: this.collections,
      invalid: this.invalidCalls,
    };
  }
}

type InvalidCall = {
  message: string;
  caller: string;
  block: number;
  object_id: string;
  op_type: string;
};
