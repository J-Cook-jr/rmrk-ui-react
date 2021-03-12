const IPFS = require('ipfs');

export const createFetchIpfs = async () => await IPFS.create();
