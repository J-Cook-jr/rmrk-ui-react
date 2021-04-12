import React, { FunctionComponent } from 'react';
import { Heading } from '@chakra-ui/react';

const H3: FunctionComponent = ({ children }) => (
  <Heading as="h3" data-name="h3" size="xl">
    {children}
  </Heading>
);

export default H3;
