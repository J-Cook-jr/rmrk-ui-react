import { useEffect, useState } from 'react';
import { db } from 'lib/models/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { useNFTStore } from 'lib/nft/store';
import { OP_TYPES } from 'rmrk-tools/dist/tools/constants';
import { NFT } from 'lib/models/NFT';
import { encodeAddress } from '@polkadot/keyring';
import { w3Store } from 'lib/w3/store';

export const useSomeoneInteractingWithNFT = (opTypes: OP_TYPES[], nft?: NFT) => {
  const account = useLiveQuery(() => db.account.get(0));
  const { systemProperties } = w3Store((state) => ({
    systemProperties: state.systemProperties,
  }));
  const [someoneIsInteractingWithNFT, setSomeoneIsInteractingWithNFT] = useState(false);
  const { unfinalisedRemarks } = useNFTStore((state) => ({
    unfinalisedRemarks: state.unfinalisedRemarks,
  }));
  const userAddressEncoded = account?.web3Account?.address
    ? encodeAddress(account.web3Account.address, systemProperties.ss58Format)
    : '';

  useEffect(() => {
    if (nft && unfinalisedRemarks && unfinalisedRemarks.length > 0 && userAddressEncoded) {
      const matchedInteraction = Boolean(
        unfinalisedRemarks.find(
          (remark) =>
            remark.id === nft?.id &&
            encodeAddress(remark.owner, systemProperties.ss58Format) !== userAddressEncoded &&
            remark.opType &&
            opTypes.includes(remark.opType),
        ),
      );

      setSomeoneIsInteractingWithNFT(matchedInteraction);
    }
  }, [unfinalisedRemarks, userAddressEncoded, nft]);

  return someoneIsInteractingWithNFT;
};
