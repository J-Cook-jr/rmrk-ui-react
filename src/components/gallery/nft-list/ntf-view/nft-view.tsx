import React, { useEffect, useState, useContext } from 'react';
import { Box } from '@chakra-ui/react';
import { IRmrk } from 'lib/types';
import Loader from 'components/common/loader';
import { IpfsContext } from 'lib/ipfs-context';
import { getIpfsJson, getIpfsImage } from 'lib/utils';

interface IProps {
  item: IRmrk;
}

const NftView = ({ item }: IProps) => {
  const [imgSrc, setImgSrc] = useState<string>();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const ipfsNode = useContext(IpfsContext);

  const getImageData = async (rmrk: IRmrk, node: any) => {
    const parsedData = await getIpfsJson(rmrk, node);

    if (parsedData) {
      if (parsedData.image) {
        const img = await getIpfsImage(parsedData.image, node);
        setImgSrc(img);
      } else {
        setLoading(false);
      }
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (item && ipfsNode) {
      getImageData(item, ipfsNode);
    }
  }, [item, ipfsNode]);

  const setLoaded = () => {
    setLoading(false);
  };

  return (
    <Box borderRadius="4px" overflow="hidden" data-name="nft-view">
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
      <Box p={3} backgroundColor="white" color="gray.800" fontFamily="mono">
        {item.collection && <Box fontSize="xs">{item.collection}</Box>}
        <Box fontSize="md">{item.name}</Box>
      </Box>
    </Box>
  );
};

export default NftView;
