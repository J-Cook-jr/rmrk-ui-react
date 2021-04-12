import React, { FunctionComponent } from 'react';
import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import TopNav from 'components/app/top-nav';
// import Footer from 'components/app/footer/footer';
import BlockSyncIndicator from 'components/common/block-sync-indicator/block-sync-indicator';
import { useRouter } from 'next/router';

interface IProps {
  title?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

const Page: FunctionComponent<IProps> = ({ children, title, ogTitle, ogDescription, ogImage }) => {
  const { pathname } = useRouter();
  const showSyncIndicator =
    pathname === '/' || pathname.startsWith('/collectibles') || pathname.startsWith('/nest');

  // const metaImg =
  //   ogImage || 'https://gateway.pinata.cloud/ipfs/QmQV2WDs1gUMEhYEnB3TLEFnQ9bvmNbWmK3SFooqhMVtsS';

  const metaTitle = ogTitle || 'Limited Edition Kanaria Eggs #NFT #RMRK';

  return (
    <>
      {title && (
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
          {/*<meta property="og:image" content={metaImg} />*/}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@RmrkApp" />
          {/*<meta name="twitter:image" content={metaImg} />*/}
          <meta property="og:title" content={metaTitle} key="ogtitle" />
          <meta
            property="og:description"
            content={ogDescription || 'Supercharged Kusama-native NFTs'}
            key="ogdesc"
          />
          <meta property="og:site_name" content="KANARIA" key="ogsitename" />
          <title>{title}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link
            rel="shortcut icon"
            href="https://gateway.pinata.cloud/ipfs/QmSkVkPiMsr1Ryu7122KHoAHqsCrgQCWthNniykLKqbA5H"
          />
        </Head>
      )}
      <Box position="sticky" top="0" zIndex="1">
        <TopNav />
      </Box>
      <Box position="relative" display="flex" flexDirection="column" flexGrow={1}>
        {showSyncIndicator && (
          <Box position="fixed" right={0} top="82px" zIndex={2} px={4}>
            <BlockSyncIndicator />
          </Box>
        )}
        {children}
      </Box>

      {/*<Box position="sticky" bottom="0">*/}
      {/*  <Footer />*/}
      {/*</Box>*/}
    </>
  );
};

export default Page;
