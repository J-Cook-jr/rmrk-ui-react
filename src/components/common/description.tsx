import React, { FunctionComponent } from 'react';
import { Code } from '@chakra-ui/react';

const Description: FunctionComponent = ({ children }) => (
  <Code px={4} pt={4} m="0" data-name="description">
    {children}
  </Code>
);

export default Description;
