import React, { useEffect } from 'react';
import { useRMRKStore } from 'lib/rmrk/store';
import { db } from 'lib/models/db';
import { populateLocalDb } from 'lib/models/populate-local-db';

const InitialiseRMRKListener = () => {
  const { loaded, setLoaded } = useRMRKStore((state) => ({
    loaded: state.loaded,
    setLoaded: state.setLoaded,
  }));

  useEffect(() => {
    if (!loaded) {
      db.on('ready', populateLocalDb);
      setLoaded(true);
    }
  }, [loaded]);

  return null;
};

export default InitialiseRMRKListener;
