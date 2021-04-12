import { w3Store } from 'lib/w3/store';
import { encodeAddress } from '@polkadot/keyring';

/*
 * Todo: Should we make that more functional? Currently it's zutsang store dependant
 */
export const getEncodedAddress = (address: string, ss58Format?: number) => {
  const { systemProperties } = w3Store.getState();
  return encodeAddress(address, ss58Format || systemProperties.ss58Format);
};
