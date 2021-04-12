import React, { useEffect, useState } from 'react';
import { Box, Grid, GridItem, useColorMode } from '@chakra-ui/react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from 'lib/models/db';
import { fetchIpfsMetadata } from 'lib/utils/ipfs/utils';
import PageContainer from 'components/common/page-container';
import H3 from 'components/common/headings/h3';
import EventHistoryTable from 'components/collectibles/event-history-table/event-history-table';
import ShareButton from 'components/common/share-button/share-button';
import ContentContainer from 'components/common/content-container';
import Actions from 'components/collectibles/actions';
import IpfsVeryfyLink from 'components/collectibles/ipfs-verify-link';
import CollectibleSection from 'components/collectibles/collectible-section';
import { NFTMetadata } from 'rmrk-tools/dist/rmrk1.0.0/classes/nft';
import CollectibleCardDescriptions from 'components/collectibles/collectible-card-description';
import { useScreenSize } from 'lib/hooks';
import { useDexieStore } from 'lib/dexie/store';
import { useTranslation } from 'next-i18next';

interface IProps {
  id: string;
}

const PageCollectible = ({ id }: IProps) => {
  const { isBlocksSyncError } = useDexieStore.getState();
  const { t } = useTranslation('collectibles');
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
  const nft = useLiveQuery(() => db.nfts.where({ id }).limit(5).reverse().first());
  const isDark = useColorMode().colorMode === 'dark';
  const { isMd } = useScreenSize();

  const getNftData = async () => {
    const response = await fetchIpfsMetadata(nft!);
    if (response) {
      setMetadata(response);
    }
  };

  useEffect(() => {
    if (nft) {
      getNftData();
    }
  }, [nft]);

  if (!nft) return null;

  const { name, instance } = nft;

  const isDescription = Boolean(metadata?.description);

  return (
    <>
      <PageContainer flexGrow={0} py={16}>
        <CollectibleSection nft={nft} metadata={metadata} />
      </PageContainer>
      <Box backgroundColor={isDark ? 'gray.900' : 'gray.50'} flexGrow={1} pb={10}>
        <PageContainer pt="0">
          <Box
            position="relative"
            py={10}
            display="flex"
            alignItems={['flex-start', 'center']}
            flexDirection={['column', 'row']}
            justifyContent="space-between">
            <Box display="flex" flexDirection="column" width={isMd ? '100%' : '70%'}>
              <H3>{t(`title-${instance}`)}</H3>
            </Box>
            <Box pt={[4, 0]}>
              <IpfsVeryfyLink href={metadata?.image || ''} />
            </Box>
            <Box position="absolute" right="0" top="0" transform="translateY(-50%)">
              <ShareButton name={name} />
            </Box>
          </Box>
          <Grid templateColumns="repeat(12, 1fr)" gap={6}>
            <GridItem colSpan={[12, 4]}>
              <Actions nft={nft} interactionPending={!isBlocksSyncError} />
            </GridItem>
            {isDescription && (
              <GridItem colSpan={[12, 8]}>
                <CollectibleCardDescriptions nft={nft} metadata={metadata} />
              </GridItem>
            )}
            <GridItem colSpan={[12, isDescription ? 12 : 8]}>
              <ContentContainer>
                <EventHistoryTable changes={nft.changes} />
              </ContentContainer>
            </GridItem>
          </Grid>
        </PageContainer>
      </Box>
    </>
  );
};

export default PageCollectible;
