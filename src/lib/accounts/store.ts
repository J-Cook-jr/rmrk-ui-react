import create from 'zustand';

type IAccountsStore = {
  modalOpened: boolean;
  toggleAccountSelectionModal: (modalOpened: boolean) => void;
  w3Enabled: boolean;
  setW3Enabled: (w3Enabled: boolean) => void;
  toggleRampModal: (rampModalOpened: boolean) => void;
  rampModalOpened: boolean;
};

export const useAccountsStore = create<IAccountsStore>((set) => ({
  modalOpened: false,
  w3Enabled: false,
  rampModalOpened: false,
  setW3Enabled: (w3Enabled: boolean) => {
    set({ w3Enabled });
  },
  toggleAccountSelectionModal: (modalOpened: boolean) => {
    set({ modalOpened });
  },
  toggleRampModal: (rampModalOpened: boolean) => {
    set({ rampModalOpened });
  },
}));
