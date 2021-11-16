module.exports = async ({ getNamedAccounts, deployments }: any) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const SubtapeFactory = (await deployments.get("SubtapeFactory")).address;

  await deploy("SubtapeFactoryCreator", {
    from: deployer,
    args: [SubtapeFactory],
    log: true,
  });
};
module.exports.tags = ["SubtapeFactoryCreator"];
module.exports.dependencies = ["SubtapeFactory"];
