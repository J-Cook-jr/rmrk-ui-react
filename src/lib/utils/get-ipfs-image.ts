import { getIpfsCid } from 'libutils/get-ipfs-cid';
import { flatten } from 'ramda';
// @ts-ignore
import { encode } from 'uint8-to-base64';

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

      return `data:image/png;base64,${encoded}`;
    }
  } catch (error) {
    console.log('FAILED TO FETCH IMAGE FROM IPFS:', { error });
  }
};
