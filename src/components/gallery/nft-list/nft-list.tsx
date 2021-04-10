import React from 'react';
import { SimpleGrid, Spinner } from '@chakra-ui/react';
import NftView from 'components/gallery/nft-list/ntf-view/nft-view';
import { db } from 'lib/models/db';
import { useLiveQuery } from 'dexie-react-hooks';

const NFTList = () => {
  const nfts = useLiveQuery(() => db.nfts.limit(200).reverse().toArray());

  return (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing={6} data-name="nft-list">
      {!nfts && <Spinner />}
      {nfts && (
        <>
          {nfts.map((nft) => (
            <NftView item={nft} key={nft.id} />
          ))}
        </>
      )}
    </SimpleGrid>
  );
};

export default NFTList;
