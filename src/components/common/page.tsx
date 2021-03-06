import React, { FunctionComponent } from 'react';
import { Container } from '@chakra-ui/react';
import Head from 'next/head';

interface IProps {
  title?: string;
}

const Page: FunctionComponent<IProps> = ({ children, title }) => (
  <>
    {title && (
      <Head>
        <title>{title}</title>
      </Head>
    )}
    <Container data-name="page" maxW="container.xl">
      {children}
    </Container>
  </>
);

export default Page;
