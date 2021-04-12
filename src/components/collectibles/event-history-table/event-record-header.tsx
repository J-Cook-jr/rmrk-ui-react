import React from 'react';
import { Box, Grid } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

const EventRecordTable = () => {
  const { t } = useTranslation('collectibles');
  return (
    <Box p={4} data-name="event-record-table" fontFamily="mono" fontSize="sm" fontWeight="semibold">
      <Grid columns={5} templateColumns="repeat(5, 1fr)">
        <Box minW="110px">{t('type')}</Box>
        <Box minW="110px">{t('from')}</Box>
        <Box minW="110px">{t('to')}</Box>
        <Box minW="110px">{t('amount')}</Box>
        <Box minW="110px">{t('date')}</Box>
      </Grid>
    </Box>
  );
};

export default EventRecordTable;
