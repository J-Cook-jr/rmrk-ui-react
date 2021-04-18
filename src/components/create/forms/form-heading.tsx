import React, { FunctionComponent } from 'react';
import { Heading } from '@chakra-ui/react';

const FormHeading: FunctionComponent = ({ children }) => (
  <Heading as="h3" size="lg" data-name="form-heading">
    {children}
  </Heading>
);

export default FormHeading;
