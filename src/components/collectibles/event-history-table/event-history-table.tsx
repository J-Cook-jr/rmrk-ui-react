import React, { useEffect, useState } from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import EventRecordHeader from 'components/collectibles/event-history-table/event-record-header';
import EventRecord from 'components/collectibles/event-history-table/event-record';
import EventHeader from 'components/collectibles/event-history-table/event-header';
import { NFT } from 'rmrk-tools';
import { getNftEventTimestamps } from 'lib/utils';
import { INftHistoryEvent } from 'lib/types';
import NoEvents from 'components/collectibles/event-history-table/no-events';

interface IProps {
  changes: NFT['changes'];
}

const EventHistoryTable = ({ changes }: IProps) => {
  const [history, setHistory] = useState<INftHistoryEvent[]>();

  useEffect(() => {
    if (changes) {
      getNftEventTimestamps(changes, setHistory);
    }
  }, [changes]);

  return (
    <>
      <Box pb={4}>
        <EventHeader />
      </Box>
      <Box
        data-name="event-table"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="gray.100"
        w="100%"
        overflowX="auto"
        borderRadius="md">
        <Box borderBottomWidth="1px" borderStyle="solid" borderColor="gray.100">
          <EventRecordHeader />
        </Box>
        {history ? (
          <Box minW={550} maxH={400} overflowX="hidden" overflowY="auto">
            {history.length === 0 ? (
              <NoEvents />
            ) : (
              <>
                {history.map((item, i) => (
                  <Box
                    borderTopWidth={i === 0 ? undefined : '1px'}
                    borderStyle="solid"
                    borderColor="gray.100"
                    key={`event-history-item-${item.timestamp}`}>
                    <EventRecord item={item} />
                  </Box>
                ))}
              </>
            )}
          </Box>
        ) : (
          <Box h="100px" display="flex" alignItems="center" justifyContent="center">
            <Spinner color="pink.400" />
          </Box>
        )}
      </Box>
    </>
  );
};

export default EventHistoryTable;
