import { NFT } from 'rmrk-tools';
import { FieldError } from 'react-hook-form';
import { HISTORY_EVENTS } from 'lib/collectibles/types';
import { ReactElement, ReactNode } from 'react';

export interface IRmrk extends NFT {}

export interface IReaction {
  count: number;
  emoji: string;
}

export interface ISociaItem {
  icon: ReactNode;
  href: string;
}

export interface ISocialShare {
  href: string;
  icon: () => ReactElement;
  aria: string;
  name: string;
}

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

export interface IIpfsProviders {
  cloudflare: string;
  ipfs: string;
  pinata: string;
}

export interface IFormattedReaction {
  unicode: string;
  emoji: string;
}

export interface IFormattedReactionWithAccounts extends IFormattedReaction {
  accounts: string[];
}

export interface IFormattedReactionByAccount {
  account: string;
  reactions: IFormattedReaction[];
}

export type IFormattedReactionByEmote = IFormattedReactionWithAccounts[];
