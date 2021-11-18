const ZERO_BYTES32 =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
const BASE_URI = "https://pinata.cloud";

module.exports = async ({ getNamedAccounts, deployments }: any) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const SubtapeFactory = (await deployments.get("SubtapeFactory")).address;

  await deploy("Mixtape", {
    from: deployer,
    args: [ZERO_BYTES32, BASE_URI, SubtapeFactory],
    log: true,
  });
};
module.exports.tags = ["Mixtape"];
module.exports.dependencies = ["SubtapeFactory"];
