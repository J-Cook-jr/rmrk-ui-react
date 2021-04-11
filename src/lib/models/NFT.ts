import { NFTConsolidated } from 'rmrk-tools/dist/tools/consolidator/consolidator';

export interface Attribute {
  display_type: DisplayType;
  trait_type: string;
  value: number | string;
}

export enum DisplayType {
  null,
  'boost_number',
  'number',
  'boost_percentage',
}

export interface NFT extends NFTConsolidated {
  snum: number; // App only 'sn' as Int
  emotenum: number; // App only 'computed total of reactions' as Int
  image?: string; // App only prefetched image
}
