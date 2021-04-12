import React from 'react';
import { Box } from '@chakra-ui/react';
import { CgArrowsExchangeV } from 'react-icons/cg';
import ContentHeading from 'components/collectibles/content-heading';
import { useTranslation } from 'next-i18next';

const EventHeader = () => {
  const { t } = useTranslation('collectibles');
  return (
    <ContentHeading data-name="event-header" display="flex" alignItems="center">
      <Box mr={1} fontSize="24px" fontWeight="semibold">
        <CgArrowsExchangeV />
      </Box>
      {t('history')}
    </ContentHeading>
  );
};

export default EventHeader;
