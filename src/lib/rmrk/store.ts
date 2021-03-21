import create from 'zustand';
import { Collection, NFT } from 'rmrk-tools';

export type IRMRKStore = {
  nfts: NFT[] | null;
  collections: Collection[] | null;
  setNfts: Function;
  setCollections: Function;
  loaded: boolean;
  setLoaded: Function;
};

export const useRMRKStore = create<IRMRKStore>((set) => ({
  nfts: null,
  collections: null,
  loaded: false,
  setNfts: (nfts: NFT[]) => {
    set({ nfts });
  },
  setCollections: (collections: Collection[]) => {
    set({ collections });
  },
  setLoaded: (loaded: boolean) => {
    set({ loaded });
  },
}));
