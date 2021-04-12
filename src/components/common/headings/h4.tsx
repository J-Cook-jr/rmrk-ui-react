import React, { FunctionComponent } from 'react';
import { Heading } from '@chakra-ui/react';

const H4: FunctionComponent = ({ children }) => (
  <Heading as="h4" data-name="h4" size="3xl" lineHeight="1em">
    {children}
  </Heading>
);

export default H4;
