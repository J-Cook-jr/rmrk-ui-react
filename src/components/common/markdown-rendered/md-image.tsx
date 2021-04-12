import React from 'react';
import { Box, Image } from '@chakra-ui/react';

interface IProps {
  src: string;
  alt?: string;
}

const MdImage = ({ src, alt }: IProps) => (
  <Box data-name="md-image" mb={4}>
    <Image src={src} alt={alt} />
  </Box>
);

export default MdImage;
