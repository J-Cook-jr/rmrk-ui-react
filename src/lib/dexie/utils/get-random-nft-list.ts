import { getRandomNumberInRange } from 'lib/utils';

export const getRandomNftList = (max: number): number[] => {
  const list: number[] = [];

  let i;
  for (i = 0; list.length < 50; i++) {
    const toAdd = getRandomNumberInRange(1, max);
    if (!list.includes(toAdd)) {
      list.push(toAdd);
    }
  }

  return list;
};
