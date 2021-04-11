import create from 'zustand';
import { UnfinalisedRemark } from 'lib/utils/get-unfinalised-remarks';

type INFTStore = {
  unfinalisedRemarks: UnfinalisedRemark[];
  setUnfinalisedRemarks: Function;
};

export const useNFTStore = create<INFTStore>((set) => ({
  unfinalisedRemarks: [],
  setUnfinalisedRemarks: (unfinalisedRemarks: UnfinalisedRemark[]) => {
    set({ unfinalisedRemarks });
  },
}));
