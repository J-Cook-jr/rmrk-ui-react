import { NFT } from 'lib/models/NFT';
import { sanitizeIpfsUrl, getIpfsJson } from 'lib/utils/ipfs/utils/index';
import { IPFS_PROVIDERS } from 'lib/common/ipfs-provider-links';
import { IIpfsProviders } from 'lib/types';
import { NFTMetadata } from 'rmrk-tools/dist/rmrk1.0.0/classes/nft';

export const fetchIpfsNftData = async (
  nft: NFT,
  ipfsNode?: any,
): Promise<{ data: NFTMetadata; provider?: keyof IIpfsProviders } | null> => {
  try {
    const gatewayUrl = sanitizeIpfsUrl(nft.metadata!, IPFS_PROVIDERS.cloudflare);
    const response = await fetch(gatewayUrl);

    if (response.status === 200) {
      const data = await response.json();
      return { data, provider: IPFS_PROVIDERS.cloudflare };
    }

    return null;
  } catch (error) {
    console.log(`Failed to fetch from ${IPFS_PROVIDERS.cloudflare} gateway`, error);
  }

  try {
    const gatewayUrl = sanitizeIpfsUrl(nft.metadata!, IPFS_PROVIDERS.pinata);
    const response = await fetch(gatewayUrl);

    if (response.status === 200) {
      const data = await response.json();
      return { data, provider: IPFS_PROVIDERS.pinata };
    }

    return null;
  } catch (error) {
    console.log(`Failed to fetch from ${IPFS_PROVIDERS.pinata} gateway`, error);
  }

  try {
    const gatewayUrl = sanitizeIpfsUrl(nft.metadata!, IPFS_PROVIDERS.ipfs);
    const response = await fetch(gatewayUrl);

    if (response.status === 200) {
      const data = await response.json();
      return { data, provider: IPFS_PROVIDERS.ipfs };
    }

    return null;
  } catch (error) {
    console.log(`Failed to fetch from ${IPFS_PROVIDERS.ipfs} gateway`, error);
  }

  if (ipfsNode) {
    try {
      const response = await getIpfsJson(nft, ipfsNode);
      if (response) {
        return { data: response };
      }
    } catch (error) {
      console.log(`Failed to fetch json from ipfs`, error);
    }
  }

  return null;
};
