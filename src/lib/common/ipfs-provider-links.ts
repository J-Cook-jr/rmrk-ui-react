import { IIpfsProviders } from 'lib/types';

export enum IPFS_PROVIDERS {
  cloudflare = 'cloudflare',
  ipfs = 'ipfs',
  pinata = 'pinata',
}

export const ipfsProviderLinks: IIpfsProviders = {
  [IPFS_PROVIDERS.cloudflare]: 'https://cloudflare-ipfs.com/',
  [IPFS_PROVIDERS.ipfs]: 'https://ipfs.io/',
  [IPFS_PROVIDERS.pinata]: 'https://gateway.pinata.cloud/',
};
