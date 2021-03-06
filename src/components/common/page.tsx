import React, { FunctionComponent } from 'react';
import { Container } from '@chakra-ui/react';

const Page: FunctionComponent = ({ children }) => (
  <Container data-name="page" maxW="container.xl">
    {children}
  </Container>
);

export default Page;
