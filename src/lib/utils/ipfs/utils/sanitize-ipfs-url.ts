import { IIpfsProviders } from 'lib/types';
import { resolveIpfsProvider } from 'lib/utils';

export const sanitizeIpfsUrl = (ipfsUrl: string, provider?: keyof IIpfsProviders) => {
  const isDouble = /^ipfs:\/\/ipfs/;
  if (isDouble.test(ipfsUrl)) {
    return ipfsUrl.replace('ipfs://', resolveIpfsProvider(provider));
  }

  const isSlashed = /^ipfs:\/\//;
  if (isSlashed.test(ipfsUrl)) {
    return ipfsUrl.replace('ipfs://', `${resolveIpfsProvider(provider)}ipfs/`);
  }

  return ipfsUrl;
};
