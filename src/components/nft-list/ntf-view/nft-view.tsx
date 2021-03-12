import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { IRmrk } from 'lib/types';
import { fetchRmrkMetadata, sanitizeIpfsUrl } from 'lib/utils';
import Loader from 'components/common/loader';

interface IProps {
  item: IRmrk;
}

const NftView = ({ item }: IProps) => {
  const [imgSrc, setImgSrc] = useState<string>();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const getImageData = async (rmrk: IRmrk) => {
    const response = await fetchRmrkMetadata(rmrk);

    if (!response?.ok || response?.status !== 200) {
      throw Error(`Could not fetch remark`);
    }

    const data = await response?.json();

    if (data) {
      if (data.image) {
        const imgPath = sanitizeIpfsUrl(data.image);
        setImgSrc(imgPath);
      } else {
        setLoading(false);
      }
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    getImageData(item);
  }, [item]);

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
      <Box p={3} backgroundColor="white" color="black" fontFamily="mono">
        {item.collection && <Box fontSize="xs">{item.collection}</Box>}
        <Box fontSize="md">{item.name}</Box>
      </Box>
    </Box>
  );
};

export default NftView;
