import React, { useEffect, useState, useContext } from 'react';
import { Box } from '@chakra-ui/react';
import { IRmrk } from 'lib/types';
import { fetchRmrkMetadata, sanitizeIpfsUrl } from 'lib/utils';
import Loader from 'components/common/loader';
import { IpfsContext } from 'lib/ipfs-context';
// @ts-ignore
import { encode } from 'uint8-to-base64';
import { flatten } from 'ramda';
import { getIpfsCid } from 'lib/utils';

interface IProps {
  item: IRmrk;
}

const NftView = ({ item }: IProps) => {
  const [imgSrc, setImgSrc] = useState<string>();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const ipfsNode = useContext(IpfsContext);

  const getImageData = async (rmrk: IRmrk, node) => {
    const cid = getIpfsCid(rmrk.metadata);
    console.log('SHOW CID:', cid);
    const stream = node.cat(cid);
    let data = '';

    for await (const chunk of stream) {
      // chunks of data are returned as a Buffer, convert it back to a string
      data += chunk.toString();
    }
    const parsedData = JSON.parse(data);
    console.log('IS IT PARSED:', JSON.parse(data));

    // const response = await fetchRmrkMetadata(rmrk);
    //
    // if (!response?.ok || response?.status !== 200) {
    //   throw Error(`Could not fetch remark`);
    // }

    // const data = await response?.json();

    if (parsedData) {
      if (parsedData.image) {
        const cid = getIpfsCid(parsedData.image);
        for await (const file of node.get(cid)) {
          if (!file.content) continue;

          const content = [];

          for await (const chunk of file.content) {
            content.push(chunk);
          }
          const flat = flatten(content);

          const encoded = encode(flat);
          const img = `data:image/png;base64,${encoded}`;

          setImgSrc(img);
        }
      } else {
        setLoading(false);
      }
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (ipfsNode) {
      getImageData(item, ipfsNode);
    }
  }, [item, ipfsNode]);

  const setLoaded = () => {
    setLoading(false);
  };

  console.log('THIS IS HAPPENING:', item);

  return (
    <Box borderRadius="4px" overflow="hidden">
      <Box paddingTop="100%" position="relative" backgroundColor="black">
        <Box
          position="absolute"
          left="0"
          top="0"
          w="100%"
          h="100%"
          display="flex"
          alignItems="center"
          justifyContent="center">
          {loading && <Loader />}
          {imgSrc && (
            <Box
              width={loading ? '0' : 'auto'}
              as="img"
              maxW="100%"
              maxH="100%"
              src={imgSrc}
              alt={item.name}
              loading="lazy"
              onLoad={setLoaded}
            />
          )}
          {!loading && !imgSrc && (
            <Box fontSize="sm" fontFamily="mono">
              {error ? <>Could not fetch remark</> : <> Not an image</>}
            </Box>
          )}
        </Box>
      </Box>
      <Box p={3} backgroundColor="white" color="black" fontFamily="mono">
        {item.collection && <Box fontSize="xs">{item.collection}</Box>}
        <Box fontSize="md">{item.name}</Box>
      </Box>
    </Box>
  );
};

export default NftView;
