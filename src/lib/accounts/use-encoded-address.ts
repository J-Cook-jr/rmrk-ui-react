import { w3Store } from 'lib/w3/store';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from 'lib/models/db';
import { encodeAddress } from '@polkadot/keyring';

export const useEncodedUserAddress = () => {
  const { systemProperties } = w3Store((state) => ({
    systemProperties: state.systemProperties,
  }));
  const account = useLiveQuery(() => db.account.get(0));
  const encodedAddress = account?.web3Account?.address;
  const userAddressEncoded = encodedAddress
    ? encodeAddress(encodedAddress, systemProperties.ss58Format)
    : encodedAddress;

  return userAddressEncoded;
};
