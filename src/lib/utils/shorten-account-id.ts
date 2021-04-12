/**
 * Shorten long addresses byt adding ellipsis in between
 * @param id
 * @param inMiddle
 */
export const shortenAccountId = (id: string, inMiddle?: boolean) => {
  const beginning = id.slice(0, inMiddle ? 4 : 12);
  const end = id.slice(-4);

  return inMiddle ? `${beginning}...${end}` : `${beginning}${id.length > 12 ? '...' : ''}`;
};
