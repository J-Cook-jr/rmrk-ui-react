import { n100 } from 'rmrk-tools';

export interface IRmrk extends n100 {}

export interface IIpfsProviders {
  cloudflare: string;
  ipfs: string;
  pinata: string;
}
