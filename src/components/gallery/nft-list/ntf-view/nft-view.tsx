import React, { useEffect, useState } from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import Loader from 'components/common/loader';
import { fetchRmrkMetadata, sanitizeIpfsUrl } from 'lib/utils';
import Image from 'next/image';
import styled from '@emotion/styled';
import { NFT } from 'lib/models/NFT';

interface IProps {
  item: NFT;
}

const StyledImg = styled(Box)`
  img {
    width: auto !important;
    height: auto !important;
    min-width: auto !important;
    min-height: auto !important;
  }
`;

const NftView = ({ item }: IProps) => {
  const [imgSrc, setImgSrc] = useState<string>();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const getImageData = async (rmrk: NFT) => {
    const response = await fetchRmrkMetadata(rmrk);

    if (!response?.ok || response?.status !== 200) {
      throw Error(`Could not fetch remark`);
    }

    const data = await response?.json();

    if (data) {
      if (data.image) {
        const img = sanitizeIpfsUrl(data.image);
        setImgSrc(img);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (item) {
      getImageData(item);
    }
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
          {loading && (
            <Box>
              <Spinner />
            </Box>
          )}
          {!loading && imgSrc && (
            <StyledImg>
              <Image width={400} height={400} src={imgSrc} alt={item.name} onLoad={setLoaded} />
            </StyledImg>
          )}
          {!loading && !imgSrc && (
            <Box fontSize="sm" fontFamily="mono">
              {error ? <>Could not fetch remark</> : <> Not an image</>}
            </Box>
          )}
        </Box>
      </Box>
      <Box p={3} backgroundColor="white" color="gray.800" fontFamily="mono" width="100%">
        {item.collection && <Box fontSize="xs">{item.collection}</Box>}
        <Box fontSize="md">{item.name}</Box>
      </Box>
    </Box>
  );
};

export default NftView;
