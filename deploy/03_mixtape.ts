const { TapeTree } = require("../src/tape-tree.js");
import { BigNumber } from "ethers";

// Demo tree --
// we will need to use a real tree for the actual deployment...
const tree = new TapeTree([
  {
    capacity: BigNumber.from(10),
    quality: BigNumber.from(10),
    style: BigNumber.from(10),
  },
  {
    capacity: BigNumber.from(10),
    quality: BigNumber.from(10),
    style: BigNumber.from(10),
  },
]);

const BASE_URI = "https://pinata.cloud";

module.exports = async ({ getNamedAccounts, deployments }: any) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const SubtapeFactory = (await deployments.get("SubtapeFactory")).address;

  await deploy("Mixtape", {
    from: deployer,
    args: [
      // need to sub this out between testing and main
      // tree.getHexRoot(),
      "0x7581d01a4a2487fdf457ac49824d715f080b1caa6212e37571d62411507363c2",
      BASE_URI,
      SubtapeFactory,
    ],
    log: true,
  });
};
module.exports.tags = ["Mixtape"];
module.exports.dependencies = ["SubtapeFactory"];
