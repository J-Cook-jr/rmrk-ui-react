import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { IRmrk, Image } from 'lib/types';
import { fetchRmrkMetadata, IPFS_PROVIDERS } from 'lib/utils';

interface IProps {
  item: IRmrk;
}

const getImageData = async (item: IRmrk) => {
  const metadata = await fetchRmrkMetadata(item);
  return metadata;
};

const NftView = ({ item }: IProps) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getImageData(item)
      .then((res) => res.json())
      .then((data) => {
        if (data.image) {
          console.log('YES THIS IS VALERA:', data.image);
          const imgPath = data.image.replace('ipfs://', IPFS_PROVIDERS.ipfs);
          setImgSrc(imgPath);
          setLoading(false);
        }
      });
  }, [item]);

  return loading ? (
    <>Loading...</>
  ) : imgSrc ? (
    <Box as="img" src={imgSrc} alt={item.name} />
  ) : (
    <>Not an image</>
  );
};

export default NftView;
