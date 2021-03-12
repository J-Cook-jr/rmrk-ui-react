const IPFS = require('ipfs');

export const createFetchIpfs = async () => {
  const node = await IPFS.create();

  return node;
};
