import { db } from './db';
import { NFT } from 'lib/models/NFT';
import { RMRK_PREFIXES, SEED_DUMP_PRECONSOLIDATED_URL } from 'lib/accounts/constants';
import { useDexieStore } from 'lib/dexie/store';
import { getUnfinalisedRemarks } from 'lib/utils/get-unfinalised-remarks';
import { useNFTStore } from 'lib/nft/store';
import { Subscription } from 'rxjs';
import { polkadotApi } from 'lib/app/get-polkadot-api';
import { Remark } from 'rmrk-tools/dist/tools/consolidator/remark';
import { Consolidator } from 'lib/listener/consolidator';
import { RemarkListener } from 'rmrk-tools';
import { IStorageProvider } from 'rmrk-tools/dist/listener';

export const getNumberOfEmotes = (reactions: NFT['reactions']) => {
  const values = Object.values(reactions);
  if (values.length === 0) return 0;
  return values.flat().length;
};

/**
 * RMRK listener storage provider to save latest block
 */
class StorageProvider implements IStorageProvider {
  readonly storageKey: string;

  constructor(storageKey?: string) {
    this.storageKey = storageKey || 'latestBlock';
  }

  public set = async (latestBlock: number) => {
    await db.substrate.update(0, { latestBlock });
  };

  public get = async () => {
    const substrateConfig = await db.substrate.get(0);
    return substrateConfig?.latestBlock || 0;
  };
}

const storageProvider = new StorageProvider();

/**
 * Fetch initial pre consolidated dump and populate local db.
 * Compare previous dump block number with current. If current is newer update db.
 * @param latestBlockInitDump
 * @param latestBlock
 */
const initialSeed = async (latestBlockInitDump: number, latestBlock: number): Promise<number> => {
  const count = await db.account.count();
  if (count < 1) {
    db.account.put({ id: 0, web3Account: null }, 0);
  }

  let response = await fetch(SEED_DUMP_PRECONSOLIDATED_URL[0]);
  if (response.status !== 200) {
    response = await fetch(SEED_DUMP_PRECONSOLIDATED_URL[1]);
  }
  const blocks = await response.json();
  let blockNum = latestBlock > latestBlockInitDump ? latestBlock : latestBlockInitDump;
  if (latestBlockInitDump !== blocks.lastBlock) {
    blockNum = blocks.lastBlock;
    const nfts: NFT[] = blocks.nfts.map((nft: NFT) => ({
      ...nft,
      id: `${nft.block}-${nft.collection}-${nft.instance}-${nft.sn}`,
      snum: parseInt((nft.sn as never) as string, 10),
      emotenum: getNumberOfEmotes(nft.reactions),
      updatedAtBlock: nft.updatedAtBlock || nft.block,
    }));

    await db.nfts.bulkPut(nfts);
    await db.substrate.update(0, { latestBlockInitDump: blocks.lastBlock });
  }
  return blockNum;
};

let subscriptionFinalised: Subscription;
let subscriptionUnfinalised: Subscription;

const unsubscribe = () => {
  if (subscriptionFinalised) {
    subscriptionFinalised.unsubscribe();
  }
  if (subscriptionUnfinalised) {
    subscriptionUnfinalised.unsubscribe();
  }
};

export const populateLocalDb = async () => {
  const { setIsDbReady } = useDexieStore.getState();
  const substrateConfig = await db.substrate.get(0);
  const latestBlock = await storageProvider.get();
  const blockNum = await initialSeed(substrateConfig?.latestBlockInitDump || 0, latestBlock || 0);
  setIsDbReady(true);
  await storageProvider.set(blockNum);
  runListener();
  // await db.collections.bulkPut(result.collections);
};

const runListener = async () => {
  unsubscribe();
  const { setIsBlocksSynced } = useDexieStore.getState();
  const { setUnfinalisedRemarks } = useNFTStore.getState();

  const consolidateFunction = (remarks: Remark[]) => {
    const consolidator = new Consolidator();
    return consolidator.consolidate(remarks);
  };

  const listener = new RemarkListener({
    polkadotApi,
    prefixes: RMRK_PREFIXES,
    consolidateFunction,
    storageProvider,
  });
  const subscriber = listener.initialiseObservable();
  subscriptionFinalised = subscriber.subscribe((val) => {
    setIsBlocksSynced(true);
  });

  const unfinilisedSubscriber = listener.initialiseObservableUnfinalised();
  subscriptionUnfinalised = unfinilisedSubscriber.subscribe((remarks) => {
    const unfinalisedRemarks = getUnfinalisedRemarks(remarks);
    setUnfinalisedRemarks(unfinalisedRemarks);
  });
};
