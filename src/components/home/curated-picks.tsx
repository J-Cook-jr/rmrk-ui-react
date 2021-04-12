import React from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import NftList from 'components/common/nft/nft-list';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from 'lib/models/db';

const CuratedPicks = () => {
  const nfts = useLiveQuery(() => db.nfts.limit(50).reverse().toArray());

  return (
    <Box data-name="common-list-section">
      {nfts ? (
        <NftList grid={[3, 4, 5, 7]} nfts={nfts} />
      ) : (
        <Box h={200} display="flex" alignItems="center" justifyContent="center">
          <Spinner color="pink.400" />
        </Box>
      )}
    </Box>
  );
};

export default CuratedPicks;
