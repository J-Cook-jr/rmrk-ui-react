import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { IRmrk } from 'lib/types';
import { fetchRmrkMetadata, IPFS_PROVIDERS, sanitizeIpfsUrl } from 'lib/utils';
import Loader from 'components/common/loader';

interface IProps {
  item: IRmrk;
}

const NftView = ({ item }: IProps) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getImageData = async (item: IRmrk) => await fetchRmrkMetadata(item);

    getImageData(item)
      .then((res) => res.json())
      .then((data) => {
        if (data.image) {
          const imgPath = sanitizeIpfsUrl(data.image);

          setImgSrc(imgPath);
        } else {
          setLoading(false);
        }
      });
  }, [item]);

  const setLoaded = () => {
    setLoading(false);
  };

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
          {imgSrc ? (
            <Box
              // display={loading ? 'none' : 'block'}
              as="img"
              maxW="100%"
              maxH="100%"
              src={imgSrc}
              alt={item.name}
              loading="lazy"
              onLoad={setLoaded}
            />
          ) : (
            <>Not an image</>
          )}
        </Box>
      </Box>
      {item.forsale && <Box>FOR SALE</Box>}
      <Box p={3} backgroundColor="white" color="black" fontFamily="mono">
        {item.collection && <Box fontSize="xs">{item.collection}</Box>}
        <Box fontSize="md">{item.name}</Box>
      </Box>
    </Box>
  );
};

export default NftView;
