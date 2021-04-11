import { Change } from 'rmrk-tools/dist/rmrk1.0.0/changelog';
import { CollectionMetadata } from 'rmrk-tools/dist/rmrk1.0.0/classes/collection';

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
