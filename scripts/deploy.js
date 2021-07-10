async function main() {

  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Mixtape = await ethers.getContractFactory("Mixtape");
  const mixtape = await Mixtape.deploy("0xbb6a65bb478bc2b7d794c43af82603cce74c122a7aa7d6ef0e115b8b1167cefa");
  await mixtape.deployed();

  console.log("Token address:", mixtape.address);

  saveFrontendFiles(mixtape);
}

function saveFrontendFiles(mixtape) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../frontend/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ Mixtape: mixtape.address }, undefined, 2)
  );

  const MixtapeArtifact = artifacts.readArtifactSync("Mixtape");

  fs.writeFileSync(
    contractsDir + "/Mixtape.json",
    JSON.stringify(MixtapeArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
