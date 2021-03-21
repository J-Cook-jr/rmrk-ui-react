import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

export interface Account {
  id: number;
  consent: boolean;
  web3Account: InjectedAccountWithMeta | null;
}
