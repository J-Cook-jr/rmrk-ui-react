export const getIpfsCid = (ipfsUrl: string) => {
  const isDouble = /^ipfs:\/\/ipfs/;
  if (isDouble.test(ipfsUrl)) {
    return ipfsUrl.replace('ipfs://ipfs/', '');
  }

  const isSingle = /^ipfs:\/\//;
  if (isSingle.test(ipfsUrl)) {
    return ipfsUrl.replace('ipfs://', '');
  }

  return ipfsUrl;
};
