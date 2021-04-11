import create from 'zustand';

export interface ISystemProperties {
  tokenDecimals: number;
  tokenSymbol: string;
  ss58Format: number;
}

type IW3Store = {
  systemProperties: ISystemProperties;
  setSystemProperties: (systemProperties: Partial<ISystemProperties>) => void;
  polkadotApiInitialised: boolean;
  setPolkadotApiInitialised: (polkadotApiInitialised: boolean) => void;
};

export const w3Store = create<IW3Store>((set) => ({
  systemProperties: {
    tokenDecimals: 12,
    tokenSymbol: 'KSM',
    ss58Format: 2,
  },
  setSystemProperties: (systemProperties: Partial<ISystemProperties>) => {
    const { tokenDecimals, tokenSymbol, ss58Format } = systemProperties;
    set({
      systemProperties: {
        tokenSymbol: tokenSymbol || 'KSM',
        tokenDecimals: tokenDecimals || 12,
        ss58Format: ss58Format || 2,
      },
    });
  },
  polkadotApiInitialised: false,
  setPolkadotApiInitialised: (polkadotApiInitialised: boolean) => {
    set({ polkadotApiInitialised });
  },
}));
