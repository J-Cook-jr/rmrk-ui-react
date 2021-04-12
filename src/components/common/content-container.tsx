import React, { FunctionComponent } from 'react';
import { Box, useColorMode } from '@chakra-ui/react';

const ContentContainer: FunctionComponent = ({ children }) => {
  const isDark = useColorMode().colorMode === 'dark';

  return (
    <Box
      p={4}
      borderRadius="10px"
      data-name="content-container"
      backgroundColor={isDark ? 'gray.700' : 'white'}
      boxShadow="0 4px 8px 0 rgba(0,0,0,0.1)">
      {children}
    </Box>
  );
};

export default ContentContainer;
