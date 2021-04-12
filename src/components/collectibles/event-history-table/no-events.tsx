import React from 'react';
import { Box } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

const NoEvents = () => {
  const { t } = useTranslation('collectibles');
  return (
    <Box
      data-name="no-events"
      p={4}
      borderBottomWidth="1px"
      borderStyle="solid"
      borderColor="gray.100"
      textAlign="center">
      {t('nothing-here-yet')}
    </Box>
  );
};

export default NoEvents;
