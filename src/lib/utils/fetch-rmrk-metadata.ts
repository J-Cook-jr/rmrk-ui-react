import { IRmrk } from 'lib/types';
import { sanitizeIpfsUrl } from 'lib/utils';

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
