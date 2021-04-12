import React, { FunctionComponent } from 'react';
import { Heading } from '@chakra-ui/react';

const H5: FunctionComponent = ({ children }) => (
  <Heading as="h5" data-name="h5" size="sm" lineHeight="1em">
    {children}
  </Heading>
);

export default H5;
