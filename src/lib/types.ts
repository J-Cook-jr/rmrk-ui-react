import { NFT } from 'rmrk-tools';
import { FieldError } from 'react-hook-form';
import { HISTORY_EVENTS } from 'lib/collectibles/types';

export interface IRmrk extends NFT {}

export interface IIpfsProviders {
  cloudflare: string;
  ipfs: string;
  pinata: string;
}

export interface IMintFormField {
  type?: string;
  name: string;
  required?: string;
  label: string;
  error?: FieldError;
}

export interface INftHistoryEvent {
  type: HISTORY_EVENTS;
  from: string;
  to: string;
  amount?: number;
  date: string;
  timestamp: number;
}
