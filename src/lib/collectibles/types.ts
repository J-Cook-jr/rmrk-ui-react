import { Change } from 'rmrk-tools/dist/rmrk1.0.0/changelog';

export enum HISTORY_EVENTS {
  list = 'List',
  claim = 'Claim',
  buy = 'Buy',
  gift = 'Gift',
}

export type TChangeEnriched = Change & {
  timestamp: number;
};
