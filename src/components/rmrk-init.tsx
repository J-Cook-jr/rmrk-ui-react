import React, { useEffect } from 'react';
import * as rmrkTools from 'rmrk-tools';
import { web3Enable, isWeb3Injected, web3Accounts } from '@polkadot/extension-dapp';
import { Heading } from '@chakra-ui/react';

const initWeb3Login = async () => {
  try {
    await web3Enable('RMRK Test');
    if (!isWeb3Injected) {
      alert(
        'You need a Web3 enabled browser to log in with Web3. The easiest solution is probably to install the Polkadot{js} extension.',
      );
    } else {
      const accounts = await web3Accounts();
      console.log('accounts', accounts);
    }
  } catch (e) {
    console.log(e);
  }
};

const RMRKInit = () => {
  useEffect(() => {
    initWeb3Login();
  }, []);

  return (
    <Heading as="h1" size="4xl" py={10}>
      Test RMRK
    </Heading>
  );
};

export default RMRKInit;
