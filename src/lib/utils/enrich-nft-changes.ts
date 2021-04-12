import { Change } from 'rmrk-tools/dist/rmrk1.0.0/changelog';
import { TChangeEnriched } from 'lib/collectibles/types';
import { polkadotApi } from 'lib/app/get-polkadot-api';

/*
 * Add timestamps to rmrk nft changelog
 */
export const enrichNFTChanges = async (
  changes: Change[],
): Promise<Change[] | TChangeEnriched[]> => {
  if (!polkadotApi) {
    return changes;
  }
  const promises = changes.map(async (change) => {
    try {
      const blockHash = await polkadotApi.rpc.chain.getBlockHash(change.block);
      const momentPrev = await polkadotApi.query.timestamp.now.at(blockHash);
      return { ...change, timestamp: momentPrev.toNumber() };
    } catch (error) {
      return change;
    }
  });

  return Promise.all(promises);
};
