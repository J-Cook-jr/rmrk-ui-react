import React, { useEffect } from 'react';
import { w3Store } from 'lib/w3/store';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from 'lib/models/db';
import { DEFAULT_WS_PROVIDER_URL } from 'lib/accounts/constants';
import { initPolkadotPromise, polkadotApi } from 'lib/app/get-polkadot-api';
import { fetchSystemProperties } from 'lib/utils/fetch-system-properties';

const savePolkadotApiInstance = async (wsProviderUrl: string) => {
  const { setPolkadotApiInitialised } = w3Store.getState();
  await initPolkadotPromise(wsProviderUrl);
  await saveChainSystemProperties();
  setPolkadotApiInitialised(true);
};

const saveInitialWsProvider = async () => {
  // Save initial substrate websocket provider url
  const hasSubstrateConfig = await db.substrate.get(0);
  if (!hasSubstrateConfig) {
    await db.substrate.add(
      {
        wsProviderUrl: DEFAULT_WS_PROVIDER_URL,
        id: 0,
        latestBlock: 0,
        latestBlockInitDump: 0,
      },
      0,
    );
  }
};

const saveChainSystemProperties = async () => {
  const { setSystemProperties } = w3Store.getState();
  const systemProperties = await fetchSystemProperties(polkadotApi);

  setSystemProperties(systemProperties);
};

const PreloadPolkadotAPI = () => {
  const substrateConfig = useLiveQuery(() => db.substrate.get(0));

  useEffect(() => {
    if (substrateConfig?.wsProviderUrl) {
      savePolkadotApiInstance(substrateConfig.wsProviderUrl);
    }
  }, [substrateConfig?.wsProviderUrl]);

  useEffect(() => {
    saveInitialWsProvider();
  }, []);

  return null;
};

export default PreloadPolkadotAPI;
