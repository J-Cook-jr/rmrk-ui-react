import { getRandomNumberInRange } from 'lib/utils';

export const getRandomNftBatch = () => getRandomNumberInRange(0, 19) * 500 + 100;
