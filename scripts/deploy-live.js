/*
Should have commented this code a while ago, not really sure what it does.
Not really sure how it compares to regular deploy.js
---
todo: revisit with better docs
*/

async function main() {

  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  // IIRC this is the root hash being passed into the contract constructor
  const Mixtape = await ethers.getContractFactory("Mixtape");
  const mixtape = await Mixtape.deploy("0xbb6a65bb478bc2b7d794c43af82603cce74c122a7aa7d6ef0e115b8b1167cefa");

  console.log("Token address:", mixtape.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
