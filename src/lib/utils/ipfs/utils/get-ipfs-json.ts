import { NFT } from 'lib/models/NFT';
import { getIpfsCid } from 'lib/utils/ipfs/utils/index';

export const getIpfsJson = async (nft: NFT, ipfsNode: any) => {
  if (!nft || !nft.metadata || !ipfsNode) return;

  try {
    const cid = getIpfsCid(nft.metadata);
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
