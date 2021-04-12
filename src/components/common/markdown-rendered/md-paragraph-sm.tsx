import React, { FunctionComponent } from 'react';
import { Box } from '@chakra-ui/react';

const MdParagraphSM: FunctionComponent = ({ children }) => (
  <Box data-name="md-paragraph" mb={4} fontSize="sm">
    {children}
  </Box>
);

export default MdParagraphSM;
