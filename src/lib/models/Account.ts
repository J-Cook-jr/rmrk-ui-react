import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

export interface Account {
  id: number;
  web3Account: InjectedAccountWithMeta | null;
}
