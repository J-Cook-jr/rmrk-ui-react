import React, { FunctionComponent } from 'react';
import { Box } from '@chakra-ui/react';

const MdParagraph: FunctionComponent = ({ children }) => (
  <Box data-name="md-paragraph" mb={4} fontSize="md">
    {children}
  </Box>
);

export default MdParagraph;
