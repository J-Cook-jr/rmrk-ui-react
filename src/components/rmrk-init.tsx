import React, {useEffect} from 'react';
import * as rmrkTools from 'rmrk-tools/dist/cjs';
import { web3Enable, isWeb3Injected, web3Accounts } from '@polkadot/extension-dapp';


const initWeb3Login = async () => {
    try {
        await web3Enable("RMRK Test");
        if (!isWeb3Injected) {
            alert(
                "You need a Web3 enabled browser to log in with Web3. The easiest solution is probably to install the Polkadot{js} extension."
            );
        } else {
            const accounts = await web3Accounts();
            console.log('accounts', accounts);
        }
    } catch (e) {
        console.log(e)
    }
}

const RMRKInit = () => {
    useEffect(() => {
        initWeb3Login();

    }, [])
    return (<div>Test RMRK</div>)
}

export default RMRKInit;
