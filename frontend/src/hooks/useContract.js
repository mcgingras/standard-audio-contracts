
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import MixtapeArtifact from "../contracts/Mixtape.json";
import contractAddress from "../contracts/contract-address.json";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "60ecdce72df343308dc295b76d6deeb6"
    }
  }
};

const useContract = () => {
  const loadWeb3Modal = async () => {
      const web3Modal = new Web3Modal({ providerOptions });
      const provider = await web3Modal.connect();
      const injectedProvider = new ethers.providers.Web3Provider(provider);
      const signer = injectedProvider.getSigner();
      const addr = await signer.getAddress();
      const mixtape = new ethers.Contract(
        contractAddress.Mixtape,
        MixtapeArtifact.abi,
        injectedProvider.getSigner(0)
      );

      return mixtape;
  };

  return loadWeb3Modal();
}

export default useContract;