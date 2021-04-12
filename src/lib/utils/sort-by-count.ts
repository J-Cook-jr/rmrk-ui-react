import { sortBy, prop, reverse } from 'ramda';

type TEmojiList = ({ emoji: string; count: number } | null)[];
export const sortByCount = (list: TEmojiList) => reverse(sortBy(prop('count'))(list));
