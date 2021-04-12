import React, { ReactNode } from 'react';
import { Box, Grid } from '@chakra-ui/react';
import { INftHistoryEvent } from 'lib/types';
import EventRecordId from 'components/collectibles/event-history-table/event-record-id';
import { GrDocumentVerified } from 'react-icons/gr';
import { HISTORY_EVENTS } from 'lib/collectibles/types';

interface IProps {
  item: INftHistoryEvent;
}

const eventIcons: Record<string, ReactNode> = {
  [HISTORY_EVENTS.claim]: <GrDocumentVerified />,
};

const EventRecord = ({ item: { type, from, to, amount, date } }: IProps) => (
  <Box p={4} data-name="event-record">
    <Grid columns={5} templateColumns="repeat(5, 1fr)">
      <Box display="flex" alignItems="center" minW="110px">
        <Box mr={1}>{eventIcons[type]}</Box>
        {type}
      </Box>
      <Box display="flex" alignItems="center" minW="110px">
        <EventRecordId id={from} fontSize={16} />
      </Box>
      <Box display="flex" alignItems="center" minW="110px">
        <EventRecordId id={to} fontSize={16} />
      </Box>
      <Box display="flex" alignItems="center" minW="110px">
        {amount ? `${amount}KSM` : '-'}
      </Box>
      <Box display="flex" alignItems="center" minW="110px">
        {date || 'Date unknown'}
      </Box>
    </Grid>
  </Box>
);

export default EventRecord;
