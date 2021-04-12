import { getIpfsCid } from 'lib/utils/ipfs/utils/index';
import { flatten } from 'ramda';
// @ts-ignore
import { encode } from 'uint8-to-base64';

const imageFormats: Record<string, string> = {
  '/': 'jpg;base64',
  i: 'png;base64',
  P: 'svg+xml;base64',
};

export const getIpfsImage = async (imagePath: string, ipfsNode: any) => {
  if (!imagePath || !ipfsNode) return;

  try {
    const cid = getIpfsCid(imagePath);

    for await (const file of ipfsNode.get(cid)) {
      if (!file.content) continue;

      const content = [];

      for await (const chunk of file.content) {
        content.push(chunk);
      }

      const dataFlat = flatten(content);
      const encoded = encode(dataFlat);

      return `data:image/${imageFormats[encoded[0]]};base64,${encoded}`;
    }
  } catch (error) {
    console.log('Failed to fetch from Ipfs:', error);
  }
};
