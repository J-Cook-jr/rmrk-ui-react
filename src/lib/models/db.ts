import Dexie, { Table } from 'dexie';
import { NFT } from 'lib/models/NFT';
import { Collection } from 'lib/models/Collection';
import { Account } from 'lib/models/Account';

type SubstrateConfig = {
  wsProviderUrl: string;
  id: number;
  latestBlock: number;
  latestBlockInitDump: number;
};

/**
 * db.nfts.add(item as NFT);
 * db.collections.add(item as NFT);
 */

export class RmrkDb extends Dexie {
  nfts!: Table<NFT, number>;
  collections!: Table<Collection, string>;
  account!: Table<Account, number>;
  substrate!: Table<SubstrateConfig, number>;
  constructor() {
    super('RMRKUI001');
    this.version(1).stores({
      nfts: 'id, collection, block, owner, name, reactions, changes',
      collections: 'id, block, name, issuer',
      account: 'id',
      substrate: 'id',
    });
  }
}

export const db = new RmrkDb();

export function resetDatabase() {
  return db.transaction('rw', db.nfts, db.collections, async () => {
    await Promise.all(db.tables.map((table) => table.clear()));
    // await populateLocalDb();
  });
}
