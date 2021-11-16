import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "@nomiclabs/hardhat-etherscan";
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  gasReporter: {
    currency: "USD",
    gasPrice: 60,
  },
  solidity: "0.8.6",
  namedAccounts: {
    deployer: 0,
    purchaser: 0,
  },
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

export default config;
