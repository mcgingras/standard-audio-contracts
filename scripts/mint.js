const axios = require('axios');
const faker = require('faker');

const MixtapeArtifact = require("../frontend/src/contracts/Mixtape.json");
const contractAddress = require("../frontend/src/contracts/contract-address.json");
const attributes = require("./attributes.json");
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

  let attrs = attributes.attributes;

  for (let i=0; i<attrs.length; i++) {
      [color, capacity, quality] = attrs[i];
      let t = await mintNFT(contract, addr1.address, capacity, quality, color);
      console.log(t);
  }
}

const mintNFT = async (contract, to, s, q, a) => {

    const uri = {
        title: faker.company.catchPhrase(),
        song1: faker.company.companyName(),
        song2: faker.company.companyName(),
        song3: faker.company.companyName(),
    }

    let ipfsResponse = await pinJSONToIPFS(uri);
    let hash = ipfsResponse.data.IpfsHash;

    let response = await mintToken(contract, to, hash, s, q, a);
    return response;
}

const mintToken = async (contract, to, uri, s, q, a) => {
    const tx = await contract.createMixtape(to, uri, s, q, a);
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
