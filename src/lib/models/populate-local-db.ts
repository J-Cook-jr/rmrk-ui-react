import { db } from './db';
import { RemarkListener, NFT, Collection } from 'rmrk-tools';
import { NFT as DexieNFT } from 'lib/models/NFT';

import { WS_PROVIDER_URLS } from 'lib/accounts/constants';
import { WsProvider } from '@polkadot/api';

const saveRemarks = async ({ nfts, collections }: { nfts: NFT[]; collections: Collection[] }) => {
  const dexieNfts: DexieNFT[] = nfts.map((nft: NFT) => ({
    ...nft,
    id: `${nft.block}-${nft.collection}-${nft.instance}-${nft.sn}`,
    snum: parseInt((nft.sn as never) as string, 10),
  }));
  await db.nfts.bulkPut(dexieNfts);
  await db.collections.bulkPut(collections);
};

export const populateLocalDb = async () => {
  // Save initial substrate websocket provider url
  const hasSubstrateConfig = await db.substrate.get(0);
  if (!hasSubstrateConfig) {
    await db.substrate.add({ wsProviderUrl: WS_PROVIDER_URLS.rmrk, id: 0, latestBlock: 0 }, 0);
  }

  // Check if local db is already initialised
  // const count = await db.nfts.count();
  // if (count > 0) {
  //   runListener(hasSubstrateConfig?.wsProviderUrl || WS_PROVIDER_URLS.rmrk);
  //   return;
  // }

  // const latestNFT = await db.nfts.where('block').above(0).last();
  // if (latestNFT) {
  //   // TODO: adjust + 1500 to avoid LIST / MINT RMRK's
  //   await db.substrate.update(0, { latestBlock: latestNFT.block + 1500 });
  // }

  runListener(hasSubstrateConfig?.wsProviderUrl || WS_PROVIDER_URLS.rmrk);
  // await db.collections.bulkPut(result.collections);
};

const runListener = async (wsProviderUrl: string) => {
  const wsProvider = new WsProvider(wsProviderUrl);
  const response = await fetch(
    'https://raw.githubusercontent.com/Swader/rmrk-tools/master/dumps/latest.json',
  );
  const initialBlockCalls = await response.json();

  console.log('start listener');
  const listener = new RemarkListener({
    providerInterface: wsProvider,
    prefixes: [],
    initialBlockCalls: initialBlockCalls,
  });

  console.log('listener', listener);

  const subscriber = listener.initialiseObservable();
  subscriber.subscribe(saveRemarks);
};
