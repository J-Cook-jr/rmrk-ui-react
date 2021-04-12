import { useEffect, useState } from 'react';
import { db } from 'lib/models/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { DEFAULT_WS_PROVIDER_URL } from 'lib/accounts/constants';

export const useSubstrateProviderUrl = () => {
  const substrateConfig = useLiveQuery(() => db.substrate.get(0));
  const [wsProviderUrl, setWsProviderUrl] = useState<string>(DEFAULT_WS_PROVIDER_URL);

  useEffect(() => {
    if (substrateConfig?.wsProviderUrl !== wsProviderUrl) {
      setWsProviderUrl(substrateConfig?.wsProviderUrl || DEFAULT_WS_PROVIDER_URL);
    }
  }, [substrateConfig]);

  return wsProviderUrl;
};
