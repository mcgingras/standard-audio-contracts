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
import { NoWalletDetected } from "./components/NoWalletDetected";
import Web3Modal from "web3modal";

// pages
import Homepage from './pages/Homepage';
import TapeIndex from './pages/TapeIndex';
import TapeEdit from './pages/TapeEdit';
import TapeShow from './pages/TapeShow';
import MyTapes from './pages/MyTapes';
import Den from './pages/Den';


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
              {/* <nav className="p-2 bg-gradient-to-r from-light-blue-800 to-cyan-600 w-100 flex justify-between px-4">
                <h1>NFTapes</h1>
                {
                  web3Modal.cachedProvider
                  ? <button onClick={ () => logoutOfWeb3Modal() }>Logout</button>
                  : <button onClick={ () => loadWeb3Modal() }>Connect</button>
                }
              </nav> */}
              <Router>
                  <Switch>
                      <Route path="/den">
                          <Den />
                      </Route>
                      <Route path="/shelf">
                          <MyTapes />
                      </Route>
                      <Route path="/tapes/:id/edit">
                          <TapeEdit />
                      </Route>
                      <Route path="/tapes/:id">
                          <TapeShow />
                      </Route>
                      <Route path="/tapes">
                          <TapeIndex />
                      </Route>
                      <Route path="/">
                          <Homepage />
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