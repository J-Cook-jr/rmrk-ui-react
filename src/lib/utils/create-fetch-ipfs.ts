const IPFS = require('ipfs');
const makeIpfsFetch = require('js-ipfs-fetch');

export const createFetchIpfs = async (fetchFrom: string) => {
  const ipfs = await IPFS.create();
  const fetch = await makeIpfsFetch({ ipfs });

  return fetch;
};
