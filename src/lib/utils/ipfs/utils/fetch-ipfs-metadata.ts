import { fetchIpfsNftData, sanitizeIpfsUrl, getIpfsImage } from 'lib/utils/ipfs/utils/index';
import { NFT } from 'lib/models/NFT';
import { NFTMetadata } from 'rmrk-tools/dist/rmrk1.0.0/classes/nft';

export const fetchIpfsMetadata = async (nft: NFT, ipfsNode?: any): Promise<NFTMetadata | null> => {
  try {
    const response = await fetchIpfsNftData(nft, ipfsNode);
    if (response) {
      const { data, provider } = response;

      if (data && data.image) {
        if (provider) {
          return { ...data, image: sanitizeIpfsUrl(data.image, provider) };
        }

        if (ipfsNode) {
          const image = await getIpfsImage(data.image, ipfsNode);
          return { ...data, image };
        }
      }
    }
  } catch (error) {
    console.log(`Failed to fetch from gateways`, error);
  }

  return null;
};
