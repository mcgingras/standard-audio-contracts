require("@nomiclabs/hardhat-waffle");
require("./tasks/faucet");
const fs = require("fs");
// const { alchemyApiKey, mnemonic } = require("./secrets.json");
const defaultNetwork = "xdai";

// function mnemonic() {
//   try {
//     return fs.readFileSync("./mnemonic.txt").toString().trim();
//   } catch (e) {
//     if (defaultNetwork !== "localhost") {
//       console.log("☢️ WARNING: No mnemonic file created for a deploy account. Try `yarn run generate` and then `yarn run account`.")
//     }
//   }
//   return "";
// }

module.exports = {
  solidity: "0.8.6",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    // rinkeby: {
    //   url: `https://eth-rinkeby.alchemyapi.io/v2/${alchemyApiKey}`,
    //   accounts: { mnemonic: mnemonic },
    // },
    xdai: {
      url: "https://rpc.xdaichain.com/",
      gasPrice: 1000000000,
      accounts: [
        "0xdbdd74cbb2a4e57c01af494770d3cc939b8ca966e03f13212d3c629c8c502474",
      ],
    },
  },
};
