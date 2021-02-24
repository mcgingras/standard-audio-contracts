import React, {useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ethers } from "ethers";

import MixtapeArtifact from "./contracts/Mixtape.json";
import contractAddress from "./contracts/contract-address.json";

import { Dapp } from "./components/Dapp";
import Form from './components/Form';
import Home from './components/Home';
import Shelf  from "./components/Shelf";
import { NoWalletDetected } from "./components/NoWalletDetected";
import { ConnectWallet } from "./components/ConnectWallet";


const App = () => {
    const [address, setAdress] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        _connectWallet();
    }, [])

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

    // need some sort of loading state while it connects to the contract...
    // or is there a way to store the contract in memory or something so it
    // does not have to reload on every page reload
    if (address == null) {
        return (
            <div></div>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/new">
                        <Form contract={contract} />
                    </Route>
                    {/* Dapp is leftover from the boilerplate I built this off but there is still */}
                    {/* good code to reference so I am leaving it in for now. */}
                    <Route path="/dapp">
                        <Dapp />
                    </Route>
                    <Route path="/shelf">
                        <Shelf contract={contract} />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;