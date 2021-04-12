import React, { FunctionComponent } from 'react';
import Description from 'components/common/description';
import { Box, Code } from '@chakra-ui/react';

const MdBlockquote: FunctionComponent = ({ children }) => (
  <Box py={4}>
    <Code px={4} pt={4} m="0" data-name="description" colorScheme="yellow">
      <Box display="flex" flexDirection={['column', 'row']}>
        <Box
          pr={[0, 4]}
          mt="-9px"
          pb={[2, 0]}
          fontSize={['5xl', '4xl']}
          lineHeight="1em"
          textAlign="center">
          ⚠️
        </Box>
        {children}
      </Box>
    </Code>
  </Box>
);

export default MdBlockquote;
