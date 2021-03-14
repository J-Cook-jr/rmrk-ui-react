import { IIpfsProviders } from 'lib/types';
import { ipfsProviders } from 'lib/templates';

export const resolveIpfsProvider = (provider?: keyof IIpfsProviders) =>
  provider ? ipfsProviders[provider] : ipfsProviders.cloudflare;
