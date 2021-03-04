import React, {useState, useEffect} from "react";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appReducer from './reducers';
import { UseWalletProvider } from 'use-wallet';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ethers } from "ethers";
import MixtapeArtifact from "./contracts/Mixtape.json";
import contractAddress from "./contracts/contract-address.json";

import Form from './components/Form';
import Home from './components/Home';
import Shelf  from "./components/Shelf";
import { NoWalletDetected } from "./components/NoWalletDetected";
import { ConnectWallet } from "./components/ConnectWallet";



const App = () => {
    const [address, setAdress] = useState(null);
    const [contract, setContract] = useState(null);

    const store = createStore(appReducer);

      const _connectWallet = async () => {
        const [selectedAddress] = await window.ethereum.enable();
        _initialize(selectedAddress);
    }

    const _initialize = (userAddress) => {
        setAdress(userAddress);
        _intializeEthers();
    }

     const _intializeEthers = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const mixtape = new ethers.Contract(
          contractAddress.Mixtape,
          MixtapeArtifact.abi,
          provider.getSigner(0)
        );

        setContract(mixtape);
      }

    if (window.ethereum === undefined) {
        return <NoWalletDetected />;
    }

    // need some way to save state of wallet connection
    // if (!window.ethereum.isConnected()) {
    //     return (
    //         <ConnectWallet
    //             connectWallet={() => _connectWallet()}
    //         />
    //     );
    // }

    return (
        <UseWalletProvider chainId={1337}>
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path="/new">
                            <Form contract={contract} />
                        </Route>
                        <Route path="/shelf">
                            <Shelf contract={contract} />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </Router>
            </Provider>
        </UseWalletProvider>
    );
}

export default App;