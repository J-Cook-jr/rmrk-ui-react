import React, { FunctionComponent } from 'react';
import { Box } from '@chakra-ui/react';

const Error: FunctionComponent = ({ children }) => (
  <Box data-name="error" color="red.400" fontFamily="mono" fontSize="sm">
    {children}
  </Box>
);

export default Error;
