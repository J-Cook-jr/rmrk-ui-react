import { IRmrk } from 'lib/types';
import { getIpfsCid } from 'lib/utils';

export const getIpfsJson = async (rmrk: IRmrk, ipfsNode: any) => {
  if (!rmrk || !rmrk.metadata || !ipfsNode) return;

  try {
    const cid = getIpfsCid(rmrk.metadata);
    const stream = ipfsNode.cat(cid);
    let data = '';

    for await (const chunk of stream) {
      data += chunk.toString();
    }

    return JSON.parse(data);
  } catch (error) {
    console.log('FAILED TO FETCH JSON FROM IPFS:', { error });
  }
};
