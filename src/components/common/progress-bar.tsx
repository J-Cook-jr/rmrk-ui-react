import React from 'react';
import { Box, useTheme } from '@chakra-ui/react';

interface IProps {
  from: number;
  to: number;
}

const ProgressBar = ({ from, to }: IProps) => {
  const filled = (to * 100) / from;
  const {
    colors: {
      purple: { 200: purple200 },
      orange: { 200: orange200 },
    },
  } = useTheme();

  return (
    <Box
      display="flex"
      alignItems="center"
      h="20px"
      position="relative"
      data-name="progress-bar"
      borderRadius="5px"
      backgroundColor="gray.50"
      overflow="hidden"
      boxShadow="0 2px 4px 0 rgba(0,0,0,0.1)">
      <Box
        position="absolute"
        left="0"
        top="0"
        bottom="0"
        w={`${filled}%`}
        background={`linear-gradient(to right, ${purple200}, ${orange200});`}
        borderRadius="5px"
      />
      <Box
        position="absolute"
        w="100%"
        height="100%"
        left="0"
        top="0"
        background="linear-gradient(to bottom, rgba(255, 255, 255, 0.075), rgba(0, 0, 0, 0.125)), linear-gradient(to right bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0))"
      />
      <Box
        position="relative"
        w="100%"
        textAlign="center"
        fontFamily="mono"
        fontSize="xs"
        color="gray.800">
        {to} / {from}
      </Box>
    </Box>
  );
};

export default ProgressBar;
