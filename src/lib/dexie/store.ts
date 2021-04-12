import create from 'zustand';

type IDexieStore = {
  isBlocksSynced: boolean;
  isBlocksSyncError: boolean;
  isDbReady: boolean;
  setIsDbReady: Function;
  setIsBlocksSynced: Function;
  setIsBlocksSyncError: Function;
};

export const useDexieStore = create<IDexieStore>((set) => ({
  isBlocksSynced: false,
  isBlocksSyncError: false,
  isDbReady: false,
  setIsBlocksSynced: (isBlocksSynced: boolean) => {
    set({ isBlocksSynced });
  },
  setIsBlocksSyncError: (isBlocksSyncError: boolean) => {
    set({ isBlocksSyncError });
  },
  setIsDbReady: (isDbReady: boolean) => {
    set({ isDbReady });
  },
}));
