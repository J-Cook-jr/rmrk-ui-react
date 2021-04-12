import React, { FunctionComponent } from 'react';
import { Heading } from '@chakra-ui/react';

const H1: FunctionComponent = ({ children }) => (
  <Heading as="h1" data-name="h1" size="3xl" letterSpacing="-2px">
    {children}
  </Heading>
);

export default H1;
