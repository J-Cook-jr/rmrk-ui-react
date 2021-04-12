import { TChangeEnriched } from '../collectibles/types';
import { format } from 'date-fns';
import { reverse } from 'ramda';

const getOwner = (item: TChangeEnriched, key: 'new' | 'old') => {
  const isOwner = item.field === 'owner';

  if (isOwner) {
    return item[key];
  }

  return '';
};

const getPrice = (item: TChangeEnriched) => {
  const isSale = item.field === 'forsale';

  if (isSale) {
    return `${item.new.slice(-12)}`;
  }

  return '';
};

export const parseHistoryEvents = (changes: TChangeEnriched[]) =>
  reverse(
    changes.map((item) => ({
      type: item.field,
      from: getOwner(item, 'old'),
      to: getOwner(item, 'new'),
      amount: getPrice(item),
      date: item.timestamp ? format(item.timestamp, 'PPP') : undefined,
      timestamp: item.timestamp,
    })),
  );
