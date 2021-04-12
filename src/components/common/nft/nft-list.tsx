import React, { memo } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import NftBlock from 'components/common/nft/nft-block';
import { NFT } from 'lib/models/NFT';
import { arePropsEqual } from 'lib/utils';

interface IProps {
  nfts: (NFT | undefined)[] | undefined;
  grid: number[];
}

const NftList = ({ nfts, grid }: IProps) => (
  <SimpleGrid columns={grid} spacing={4} data-name="nft-list">
    {nfts && nfts.map((item) => item && <NftBlock key={`nft-list-item-${item.id}`} nft={item} />)}
  </SimpleGrid>
);

export default memo(NftList, arePropsEqual);
