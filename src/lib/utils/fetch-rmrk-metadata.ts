import { sanitizeIpfsUrl } from 'lib/utils';
import { NFT } from 'lib/models/NFT';

export const fetchRmrkMetadata = async (rmrk: NFT) => {
  if (!rmrk.metadata) return;
  try {
    const url = sanitizeIpfsUrl(rmrk.metadata);
    const response = await fetch(url);

    return response;
  } catch (error) {
    console.log('Could not fetch remark', error);
  }
};
