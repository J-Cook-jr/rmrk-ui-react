import React, { FunctionComponent } from 'react';
import { Heading } from '@chakra-ui/react';

const H2: FunctionComponent = ({ children }) => (
  <Heading as="h2" data-name="h2" size="xl" textTransform="uppercase" letterSpacing="0.05em">
    {children}
  </Heading>
);

export default H2;
