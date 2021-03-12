import React, { FunctionComponent } from 'react';
import { Container, Box } from '@chakra-ui/react';
import Head from 'next/head';
import TopNav from 'components/app/top-nav';

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
    <Box position="sticky" top="0" zIndex="1" mb={6}>
      <TopNav />
    </Box>
    <Container data-name="page" maxW="container.xl">
      {children}
    </Container>
  </>
);

export default Page;
