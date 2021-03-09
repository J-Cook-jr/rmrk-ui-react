import { IRmrk } from 'lib/types';

export enum IPFS_PROVIDERS {
  cloudflare = 'https://cloudflare-ipfs.com/',
  ipfs = 'https://ipfs.io/',
  pinata = 'https://gateway.pinata.cloud/',
}

const resolveProvider = (provider?: IPFS_PROVIDERS) =>
  provider ? IPFS_PROVIDERS[provider] : IPFS_PROVIDERS.ipfs;

export const sanitizeIpfsUrl = (ipfsUrl: string, provider?: IPFS_PROVIDERS) => {
  const rr = /^ipfs:\/\/ipfs/;
  if (rr.test(ipfsUrl)) {
    return ipfsUrl.replace('ipfs://', resolveProvider(provider));
  }

  const r = /^ipfs:\/\//;
  if (r.test(ipfsUrl)) {
    return ipfsUrl.replace('ipfs://', `${resolveProvider(provider)}ipfs/`);
  }

  return ipfsUrl;
};

export const fetchRmrkMetadata = async (rmrk: IRmrk) => {
  if (!rmrk.metadata) return;
  try {
    const url = sanitizeIpfsUrl(rmrk.metadata);
    const response = await fetch(url);

    return response;
  } catch (error) {
    console.log('Could not fetch remark', error);
  }
};
