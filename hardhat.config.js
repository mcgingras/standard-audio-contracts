require("@nomiclabs/hardhat-waffle");
const fs = require("fs");
// require("hardhat-gas-reporter");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

const defaultNetwork = "xdai";

function mnemonic() {
  try {
    return fs.readFileSync("./mnemonic.txt").toString().trim();
  } catch (e) {
    if (defaultNetwork !== "localhost") {
      console.log("☢️ WARNING: No mnemonic file created for a deploy account. Try `yarn run generate` and then `yarn run account`.")
    }
  }
  return "";
}

module.exports = {
  solidity: "0.7.3",
  networks: {
    hardhat: {
      chainId: 1337
    },
    xdai: {
      url: "https://rpc.xdaichain.com/",
      gasPrice: 1000000000,
      accounts: ["0xdbdd74cbb2a4e57c01af494770d3cc939b8ca966e03f13212d3c629c8c502474"]
    }
  }
}
