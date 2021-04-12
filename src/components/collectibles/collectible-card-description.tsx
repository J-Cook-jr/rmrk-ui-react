import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { NFT } from 'lib/models/NFT';
import { NFTMetadata } from 'rmrk-tools/dist/rmrk1.0.0/classes/nft';
import ContentContainer from 'components/common/content-container';
import ContentHeading from 'components/collectibles/content-heading';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { getLocalMarkdownLocalisedServer } from 'lib/utils/api';

interface IProps {
  nft: NFT;
  metadata: NFTMetadata | null;
}

const CollectibleCardDescriptions = ({ nft, metadata }: IProps) => {
  const router = useRouter();
  const [markdown, setMarkdown] = useState('');
  const { t } = useTranslation('collectibles');
  const description = metadata?.description || '';
  const { locale = null } = router;

  useEffect(() => {
    if (locale) {
      (async () => {
        try {
          const md = await getLocalMarkdownLocalisedServer(
            locale,
            `collectible-description-${nft.instance}`,
          );
          setMarkdown(md);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [locale]);

  return markdown ? (
    <ContentContainer>
      <ContentHeading pb={4}>{t('description')}</ContentHeading>
      <Box fontSize="sm" fontFamily="mono" whiteSpace="pre-line">
        {description}
      </Box>
    </ContentContainer>
  ) : null;
};

export default CollectibleCardDescriptions;
