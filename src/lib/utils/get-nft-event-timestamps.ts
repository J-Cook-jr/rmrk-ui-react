import { Change } from 'rmrk-tools/dist/rmrk1.0.0/changelog';
import { enrichNFTChanges } from 'lib/utils/enrich-nft-changes';
import { parseHistoryEvents } from 'lib/utils/parse-history-events';
import { TChangeEnriched } from 'lib/collectibles/types';

export const getNftEventTimestamps = async (changes: Change[], setHistory: Function) => {
  const enrichedChanges = await enrichNFTChanges(changes);
  setHistory(parseHistoryEvents(enrichedChanges as TChangeEnriched[]));
};
