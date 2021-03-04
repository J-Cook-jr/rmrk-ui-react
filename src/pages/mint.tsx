import { Text } from '@chakra-ui/react';
import { Hero } from '../components/Hero';
import { Container } from '../components/Container';
import { Main } from '../components/Main';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import dynamic from 'next/dynamic';

const RMRKInit = dynamic(() => import('../components/rmrk-init'), { ssr: false });

const Mint = () => (
  <Container height="100vh">
    <Hero />
    <Main>
      <Text>
        This page will be a form to mind new NFT on Kusama Remark
      </Text>

      <RMRKInit />
    </Main>
    <DarkModeSwitch />
  </Container>
);

export default Mint;
