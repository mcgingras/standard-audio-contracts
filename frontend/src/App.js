import React, {useState, useEffect, useCallback} from "react";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appReducer from './reducers';
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
import CassettePage from './components/CassettePage';
import Player from './components/Player';
import CassetteModel from "./components/CassetteModel";
import Web3Modal from "web3modal";

const App = () => {
    const [address, setAdress] = useState(null);
    const [contract, setContract] = useState(null);
    const [injectedProvider, setInjectedProvider] = useState();
    const store = createStore(appReducer);

    const loadWeb3Modal = useCallback(async () => {
      const provider = await web3Modal.connect();
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    }, [setInjectedProvider]);

    useEffect(() => {
      if (web3Modal.cachedProvider) {
        loadWeb3Modal();
      }
    }, [loadWeb3Modal]);

    useEffect(() => {

      const getSigner = async () => {
        if (injectedProvider) {
          const signer = injectedProvider.getSigner();
          console.log(signer)
          let addr = await signer.getAddress();
          setAdress(addr);

          const mixtape = new ethers.Contract(
            contractAddress.Mixtape,
            MixtapeArtifact.abi,
            injectedProvider.getSigner(0)
          );

          setContract(mixtape);
        }
      }
      getSigner();
    }, [injectedProvider])



    if (window.ethereum === undefined) {
        return <NoWalletDetected />;
    }

    return (
          <Provider store={store}>
              <nav className="w-full p-2 bg-gray-100 flex justify-between px-4">
                <h1>NFTapes</h1>
                {
                  web3Modal.cachedProvider
                  ? <button onClick={ () => logoutOfWeb3Modal() }>Logout</button>
                  : <button onClick={ () => loadWeb3Modal() }>Connect</button>
                }
              </nav>
              <Router>
                  <Switch>
                      <Route path="/cassette/:id">
                          <CassettePage />
                      </Route>
                      <Route path="/new">
                          <Form contract={contract} />
                      </Route>
                      <Route path="/c">
                        <CassetteModel />
                      </Route>
                      <Route path="/player">
                          <Player />
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
    );
}


const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions: {
    // none, since using MM....
  },
});

const logoutOfWeb3Modal = async () => {
  await web3Modal.clearCachedProvider();
  setTimeout(() => {
    window.location.reload();
  }, 1);
};

export default App;