import React, { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import { AppProps } from 'next/app';
import { IpfsContextProvider } from 'lib/ipfs-context';
import { createFetchIpfs } from 'lib/utils';
import dynamic from 'next/dynamic';

const InitialiseRMRKListener = dynamic(() => import('components/common/initialise-rmrk-listener'), {
  ssr: false,
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [ipfsNode, setIpfsNode] = useState(null);

  useEffect(() => {
    createFetchIpfs().then((node) => setIpfsNode(node));
  }, []);

  return (
    <IpfsContextProvider value={ipfsNode}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
        <InitialiseRMRKListener />
      </ChakraProvider>
    </IpfsContextProvider>
  );
};

export default MyApp;
