/**
 * Returns either singular or plural word depending on a given count number.
 * If no plural word is passed as argument, it will be just "singular + s"
 *
 * @param {number} count
 * @param {string} singular
 * @param {string} plural {optional}
 * @return {string}
 */
export const simplePluralize = (
  count: number = 1,
  singular: string = '',
  plural?: string,
): string => {
  if (!singular.length) {
    return '';
  }
  return count === 1 ? singular : plural || `${singular}s`;
};
