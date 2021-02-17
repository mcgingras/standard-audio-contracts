import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ethers } from "ethers";

import MixtapeArtifact from "./contracts/Mixtape.json";
import contractAddress from "./contracts/contract-address.json";

import { Dapp } from "./components/Dapp";
import Home from './components/Home';
import { NoWalletDetected } from "./components/NoWalletDetected";
import { ConnectWallet } from "./components/ConnectWallet";


const App = () => {
    const [address, setAdress] = useState(null);
    const [contract, setContract] = useState(null);

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

        console.log(mixtape);
        setContract(mixtape);
      }

    if (window.ethereum === undefined) {
        return <NoWalletDetected />;
    }

    if (!address) {
        return (
            <ConnectWallet
                connectWallet={() => _connectWallet()}
            />
        );
    }

    return (
        <Router>
            <div>
                <Switch>
                <Route path="/dapp">
                    <Dapp />
                </Route>
                <Route path="/">
                    <Home contract={contract} />
                </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;