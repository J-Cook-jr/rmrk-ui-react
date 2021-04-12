import { useEffect, useState } from 'react';
import { populateLocalDb } from 'lib/models/populate-local-db';

const fetchData = async (setReady: Function) => {
  await populateLocalDb();
  setReady(true);
};

export const usePopulateDB = (): boolean => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!ready) {
      fetchData(setReady);
    }
  }, [ready]);

  return ready;
};
