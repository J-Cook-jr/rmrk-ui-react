import React, { useEffect } from 'react';
import { Wrap, WrapItem, Center } from '@chakra-ui/react';
import { fetchRemarks, utils, consolidator } from 'rmrk-tools';
import { ApiPromise, WsProvider } from '@polkadot/api';
import {isEmpty} from 'ramda'

const wsProvider = new WsProvider('wss://kusama-rpc.polkadot.io');

const fetchRemarksPromise = async () => {
  try {
    const api = await ApiPromise.create({ provider: wsProvider });
    await api.isReady;
    const to = await utils.getLatestFinalizedBlock(api)
    console.log('Latest finalized block is:', to)
    const remarkBlocks = await fetchRemarks(api, 4892976, 4893177, ['']);
    console.log('Remark Blocks', remarkBlocks);

    if (remarkBlocks && !isEmpty(remarkBlocks)) {

      const remarks = utils.getRemarksFromBlocks(remarkBlocks)
      console.log('Remarks', remarks);
      const con = new consolidator();
      con.consolidate(remarks);
    }
  } catch (error) {
    console.log('Could not fetch remarks', error);
  }
};

const NFTList = () => {
  useEffect(() => {
    fetchRemarksPromise();
  }, []);
  return (
    <Wrap spacing="30px">
      <WrapItem>
        <Center w="180px" h="80px" bg="red.200">
          Box 1
        </Center>
      </WrapItem>
      <WrapItem>
        <Center w="180px" h="80px" bg="green.200">
          Box 2
        </Center>
      </WrapItem>
      <WrapItem>
        <Center w="180px" h="80px" bg="tomato">
          Box 3
        </Center>
      </WrapItem>
      <WrapItem>
        <Center w="180px" h="80px" bg="blue.200">
          Box 4
        </Center>
      </WrapItem>
    </Wrap>
  );
};

export default NFTList;
