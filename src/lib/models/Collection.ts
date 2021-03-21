import { Attribute } from 'lib/models/NFT';

type Change = {
  field: string;
  old: any;
  new: any;
  caller: string;
  block: number;
  valid: boolean;
};

export interface CollectionMetadata {
  description?: string;
  attributes: Attribute[];
  external_url?: string;
  image?: string;
  image_data?: string;
}

export interface Collection {
  block: number;
  name: string;
  max: number;
  issuer: string;
  symbol: string;
  id: string;
  metadata: string;
  changes: Change[];
  loadedMetadata?: CollectionMetadata;
}
