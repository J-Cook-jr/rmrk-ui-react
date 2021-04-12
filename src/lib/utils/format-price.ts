import { formatBalance } from '@polkadot/util';
import { ISystemProperties } from 'lib/w3/store';

/**
 * Format BigInt price based on chain's decimal and symbol
 * @param price - string or number inputted price in plancks
 * @param systemProperties - chain's systemProperties as returned from polkadot api
 * @param toFixed - whether to format price to fixed number (will convert 1.0000 KSM to 1 KSM)
 */
export const formatPrice = (
  price: BigInt | string | number,
  systemProperties: ISystemProperties,
  toFixed: boolean = false,
) => {
  if (typeof price !== 'bigint') {
    console.warn('For best results please pass BigInt to this util function');
  }

  let numberPrice = price;
  if (typeof price == 'string') {
    numberPrice = BigInt(price);
  }

  if (typeof price === 'number') {
    numberPrice = BigInt(Number(`${price}e${systemProperties.tokenDecimals}`));
  }

  const { tokenDecimals, tokenSymbol } = systemProperties;
  if (toFixed) {
    const formatted = formatBalance(numberPrice, {
      decimals: tokenDecimals,
      withUnit: false,
      forceUnit: '-',
    });
    return `${parseFloat(formatted)} ${tokenSymbol}`;
  } else {
    return formatBalance(numberPrice, {
      decimals: tokenDecimals,
      withUnit: tokenSymbol,
      forceUnit: '-',
    });
  }
};
