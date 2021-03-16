import { NFT } from 'rmrk-tools';
import { FieldError } from 'react-hook-form';

export interface IRmrk extends NFT {}

export interface IIpfsProviders {
  cloudflare: string;
  ipfs: string;
  pinata: string;
}

export interface IMintFormField {
  type?: string;
  name: string;
  required?: string;
  label: string;
  error?: FieldError;
}
