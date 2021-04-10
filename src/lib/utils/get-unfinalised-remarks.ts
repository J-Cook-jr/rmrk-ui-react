import { NFT } from 'rmrk-tools';
import { Remark } from 'rmrk-tools/dist/tools/consolidator/remark';
import { OP_TYPES } from 'rmrk-tools/dist/tools/constants';
import { Emote } from 'rmrk-tools/dist/rmrk1.0.0/classes/emote';
import { getCollectionFromRemark } from 'rmrk-tools/dist/tools/consolidator/interactions/mint';
import { Send } from 'rmrk-tools/dist/rmrk1.0.0/classes/send';
import { List } from 'rmrk-tools/dist/rmrk1.0.0/classes/list';
import { Consume } from 'rmrk-tools/dist/rmrk1.0.0/classes/consume';
import { Buy } from 'rmrk-tools/dist/rmrk1.0.0/classes/buy';
import { getChangeIssuerEntity } from 'rmrk-tools/dist/tools/consolidator/interactions/changeIssuer';

export interface UnfinalisedRemark {
  block: number;
  owner: string;
  id: string;
  opType?: OP_TYPES;
}

export const getUnfinalisedRemarks = (remarks: Remark[] = []): UnfinalisedRemark[] => {
  const unfinalisedRemarks = [];
  for (const remark of remarks) {
    const unfinalisedRemark: UnfinalisedRemark = {
      block: remark.block,
      owner: remark.caller,
      id: '',
      opType: undefined,
    };
    switch (remark.interaction_type) {
      case OP_TYPES.MINT:
        const collection = getCollectionFromRemark(remark);
        if (collection?.id) {
          unfinalisedRemark.id = collection.id;
          unfinalisedRemark.opType = OP_TYPES.MINT;
          unfinalisedRemarks.push(unfinalisedRemark);
        }
        break;

      case OP_TYPES.MINTNFT:
        const nft = NFT.fromRemark(remark.remark, remark.block);
        if (typeof nft !== 'string' && nft.getId()) {
          unfinalisedRemark.id = nft.getId();
          unfinalisedRemark.opType = OP_TYPES.MINTNFT;
          unfinalisedRemarks.push(unfinalisedRemark);
        }
        break;

      case OP_TYPES.SEND:
        const sendEntity = Send.fromRemark(remark.remark);
        if (typeof sendEntity !== 'string' && sendEntity.id) {
          unfinalisedRemark.id = sendEntity.id;
          unfinalisedRemark.opType = OP_TYPES.SEND;
          unfinalisedRemarks.push(unfinalisedRemark);
        }
        break;

      case OP_TYPES.BUY:
        // An NFT was bought after being LISTed
        const buyEntity = Buy.fromRemark(remark.remark);
        if (typeof buyEntity !== 'string' && buyEntity?.id) {
          unfinalisedRemark.id = buyEntity.id;
          unfinalisedRemark.opType = OP_TYPES.BUY;
          unfinalisedRemarks.push(unfinalisedRemark);
        }
        break;

      case OP_TYPES.CONSUME:
        // An NFT was burned
        const consumeEntity = Consume.fromRemark(remark.remark);
        if (typeof consumeEntity !== 'string' && consumeEntity?.id) {
          unfinalisedRemark.id = consumeEntity.id;
          unfinalisedRemark.opType = OP_TYPES.CONSUME;
          unfinalisedRemarks.push(unfinalisedRemark);
        }
        break;

      case OP_TYPES.LIST:
        // An NFT was listed for sale
        const listEntity = List.fromRemark(remark.remark);
        if (typeof listEntity !== 'string' && listEntity?.id) {
          unfinalisedRemark.id = listEntity.id;
          unfinalisedRemark.opType = OP_TYPES.LIST;
          unfinalisedRemarks.push(unfinalisedRemark);
        }
        break;

      case OP_TYPES.EMOTE:
        const emoteEntity = Emote.fromRemark(remark.remark);
        if (typeof emoteEntity !== 'string' && emoteEntity?.id) {
          unfinalisedRemark.id = emoteEntity.id;
          unfinalisedRemark.opType = OP_TYPES.EMOTE;
          unfinalisedRemarks.push(unfinalisedRemark);
        }
        break;

      case OP_TYPES.CHANGEISSUER:
        const changeIssuerEntity = getChangeIssuerEntity(remark);
        if (typeof changeIssuerEntity !== 'string' && changeIssuerEntity?.id) {
          unfinalisedRemark.id = changeIssuerEntity.id;
          unfinalisedRemark.opType = OP_TYPES.CHANGEISSUER;
          unfinalisedRemarks.push(unfinalisedRemark);
        }
        break;

      default:
        break;
    }
  }
  return unfinalisedRemarks;
};
