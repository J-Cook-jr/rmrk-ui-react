import { useEffect, useState } from 'react';
import { getPolkadotIdentity } from 'lib/utils/get-polkadot-identity';
import { w3Store } from 'lib/w3/store';

export const usePolkadotIdentity = (id: string) => {
  const { polkadotApiInitialised } = w3Store((state) => ({
    polkadotApiInitialised: state.polkadotApiInitialised,
  }));
  const [userName, setUserName] = useState(id);

  const getId = async (id: string) => {
    const name = await getPolkadotIdentity(id);
    setUserName(name);
  };

  useEffect(() => {
    if (polkadotApiInitialised) {
      getId(id);
    }
  }, [polkadotApiInitialised]);

  return { userName };
};
