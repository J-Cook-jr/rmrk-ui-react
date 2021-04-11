import React, { useEffect } from 'react';
import { populateLocalDb } from 'lib/models/populate-local-db';
import { db } from 'lib/models/db';
import { w3Store } from 'lib/w3/store';

const PopulateDataToIndexDb = () => {
  const { polkadotApiInitialised } = w3Store((state) => ({
    polkadotApiInitialised: state.polkadotApiInitialised,
  }));
  useEffect(() => {
    if (polkadotApiInitialised) {
      db.on('ready', populateLocalDb);
    }
  }, [polkadotApiInitialised]);

  return null;
};

export default PopulateDataToIndexDb;
