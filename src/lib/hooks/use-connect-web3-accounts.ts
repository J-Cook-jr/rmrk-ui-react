import { useEffect, useState } from 'react';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { useAccountsStore } from 'lib/accounts/store';
import { w3Store } from 'lib/w3/store';

const getWeb3Accounts = async (setAccounts: Function) => {
  const { systemProperties } = w3Store.getState();
  const allAccounts = await web3Accounts({ ss58Format: systemProperties.ss58Format });
  setAccounts(allAccounts);
};

const checkEnabled = async (setW3Enabled: Function) => {
  const enabledApps = await web3Enable('kanaria-rmrk');
  setW3Enabled(enabledApps.length > 0);
};

export const useConnectWeb3Account = () => {
  const { w3Enabled, setW3Enabled } = useAccountsStore((state) => ({
    w3Enabled: state.w3Enabled,
    setW3Enabled: state.setW3Enabled,
  }));
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[] | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready && w3Enabled) {
      getWeb3Accounts(setAccounts);
    }
  }, [ready, w3Enabled]);

  useEffect(() => {
    checkEnabled(setW3Enabled);
  }, [w3Enabled]);

  const initialise = () => {
    setReady(true);
  };

  return { accounts, initialise, enabled: w3Enabled };
};
