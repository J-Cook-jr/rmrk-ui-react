import { ApiPromise, WsProvider } from '@polkadot/api';
import { useDexieStore } from 'lib/dexie/store';

let wsProvider: WsProvider;
let polkadotApi: ApiPromise;

export const initPolkadotPromise = async (wsProviderUrl: string) => {
  if (wsProvider && polkadotApi) return { wsProvider, polkadotApi };
  const { setIsBlocksSyncError, setIsBlocksSynced } = useDexieStore.getState();
  wsProvider = new WsProvider(wsProviderUrl);
  wsProvider.on('error', (e) => {
    setIsBlocksSynced(false);
    setIsBlocksSyncError(true);
  });

  // TODO: discuss if that's safe to re-connect or better to keep the error and force refresh
  // wsProvider.on('connected', () => {
  //   setIsBlocksSynced(true);
  //   setIsBlocksSyncError(false);
  // });

  polkadotApi = await ApiPromise.create({ provider: wsProvider });
  await polkadotApi.isReady;
  return { wsProvider, polkadotApi };
};

export { wsProvider, polkadotApi };
