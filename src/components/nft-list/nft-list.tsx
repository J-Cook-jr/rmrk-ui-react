import React, { useEffect, useState } from 'react';
import { Wrap, WrapItem, Center } from '@chakra-ui/react';
import { utils, Consolidator } from 'rmrk-tools/dist';
import { ApiPromise, WsProvider } from '@polkadot/api';
import dumpJSON from '../../dumps/dump-kusama-6462426.json';
import { INFT } from 'lib/types';
import { isEmpty } from 'ramda';

const wsProvider = new WsProvider('wss://node.rmrk.app');

const fetchRemarksPromise = async () => {
  try {
    const api = await ApiPromise.create({ provider: wsProvider });
    await api.isReady;
    // const to = await utils.getLatestFinalizedBlock(api);
    // console.log('Latest finalized block is:', to);
    // const remarkBlocks = await fetchRemarks(api, 6431422, 6431424, ['']);
    const remarkBlocks = dumpJSON;
    // console.log('Remark Blocks', remarkBlocks);

    if (remarkBlocks && !isEmpty(remarkBlocks)) {
      const remarks = utils.getRemarksFromBlocks(remarkBlocks);
      // console.log('Remarks', remarks);
      const consolidator = new Consolidator();
      // console.log('Consolidated nfts:', nfts);
      // console.log('Consolidated collections:', collections);

      return consolidator.consolidate(remarks);
    }
  } catch (error) {
    console.log('Could not fetch remarks', error);
  }
};

const NFTList = () => {
  const [nftList, setNftList] = useState<INFT[]>([]);

  useEffect(() => {
    fetchRemarksPromise().then((data) => setNftList(data?.nfts || []));
  }, []);

  return (
    <Wrap spacing="30px">
      {nftList.map((item) => (
        <WrapItem>
          <Center w="180px" h="80px" bg="red.200">
            {item.name}
          </Center>
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default NFTList;
