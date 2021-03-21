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

type Change = {
  field: string;
  old: any;
  new: any;
  caller: string;
  block: number;
  valid: boolean;
};

export interface Reactionmap {
  [unicode: string]: string[];
}

export interface NFTMetadata {
  external_url?: string;
  image?: string;
  image_data?: string;
  description?: string;
  name?: string;
  attributes: Attribute[];
  background_color?: string;
  animation_url?: string;
  youtube_url?: string;
}

export interface NFT {
  id: string;
  block: number;
  collection: string;
  name: string;
  instance: string;
  transferable: number;
  sn: string;
  snum: number; // App only 'sn' as Int
  metadata?: string;
  image?: string; // App only prefetched image
  data?: string;
  forsale: BigInt;
  reactions: Reactionmap;
  changes: Change[];
  owner: string;
  loadedMetadata?: NFTMetadata;
  burned: string;
}
