import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { IRmrk } from 'lib/types';
import { fetchRmrkMetadata, IPFS_PROVIDERS } from 'lib/utils';

interface IProps {
  item: IRmrk;
}

const getImageData = async (item: IRmrk) => await fetchRmrkMetadata(item);

const NftView = ({ item }: IProps) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getImageData(item)
      .then((res) => res.json())
      .then((data) => {
        if (data.image) {
          const imgPath = data.image.replace('ipfs://', IPFS_PROVIDERS.ipfs);
          setImgSrc(imgPath);
          setLoading(false);
        }
      });
  }, [item]);

  return loading ? (
    <>Loading...</>
  ) : imgSrc ? (
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
          <Box as="img" maxW="100%" maxH="100%" src={imgSrc} alt={item.name} />
        </Box>
      </Box>
      {item.forsale && <Box>FOR SALE</Box>}
      <Box p={3} backgroundColor="white" color="black" fontFamily="mono">
        {item.collection && <Box fontSize="xs">{item.collection}</Box>}
        <Box fontSize="md">{item.name}</Box>
      </Box>
    </Box>
  ) : (
    <>Not an image</>
  );
};

export default NftView;
