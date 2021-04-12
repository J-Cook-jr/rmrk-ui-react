import React, { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import { AppProps } from 'next/app';
import { IpfsContextProvider } from 'lib/ipfs-context';
import { createFetchIpfs } from 'lib/utils';
import Fonts from 'components/app/fonts';
import dynamic from 'next/dynamic';

const PreloadPolkadotAPI = dynamic(() => import('components/app/preload-polkadot-api'), {
  ssr: false,
});

const PopulateDataToIndexDb = dynamic(() => import('components/dexie/populate-data-to-index-db'), {
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
        <Fonts />
        <Component {...pageProps} />
        <PopulateDataToIndexDb />
        <PreloadPolkadotAPI />
      </ChakraProvider>
    </IpfsContextProvider>
  );
};

export default MyApp;
