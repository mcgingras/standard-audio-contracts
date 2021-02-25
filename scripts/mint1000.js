const axios = require('axios');

const MixtapeArtifact = require("../frontend/src/contracts/Mixtape.json");
const contractAddress = require("../frontend/src/contracts/contract-address.json");
require('dotenv').config()

async function main() {

  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  const [owner, addr1, ...addrs] = await ethers.getSigners();

  const contract = new ethers.Contract(
    contractAddress.Mixtape,
    MixtapeArtifact.abi,
    owner
  );

  for (let i=0; i<10; i++) {
    let t = await mintNFT(contract, addr1.address);
    console.log(t);
  }
}

const mintNFT = async (contract, to) => {

    const uri = {
        title: "DEMO",
        song1: "abc",
        song2: "def",
        song3: "ghi"
    }

    let ipfsResponse = await pinJSONToIPFS(uri);
    let hash = ipfsResponse.data.IpfsHash;

    let response = await mintToken(contract, to, hash);
    return response;
}

const mintToken = async (contract, to, uri) => {
    const tx = await contract.createMixtape(to, uri);
    const receipt = await tx.wait();

    return receipt;
}

const pinJSONToIPFS = (JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    return axios
    .post(url, JSONBody, {
        headers: {
            pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
            pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_KEY
        }
    })
    .then(function (response) {
        return response;
    })
    .catch(function (error) {
        console.log(error)
    })
};



main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
