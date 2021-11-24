# MXTape Contracts

Repo containing the contracts, deployments, and test cases for the smart contracts of the MXTapes project.

[Read More](https://docs.google.com/document/d/1dLMGF05rfyAeyf8dHteo8na3bnuXJT_EBJ5eLTB7e-4/edit)

### Stack

- [Hardhat](https://hardhat.org/)
- [Ethers](https://docs.ethers.io/v5/)
- [Hardhat Hackathon Boilerplate](https://github.com/nomiclabs/hardhat-hackathon-boilerplate)
- [Hardhat Deploy](https://github.com/wighawag/hardhat-deploy)
- [TypeChain](https://github.com/dethcrypto/TypeChain)
- Helps to have Metamask installed.

### Quick Start

New instructions coming soon.

#### _new instructions_

any of these commands (fairly self explainatory)

```
npm compile
npm deploy
npm test
```

#### _old instructions_

start up a hardhat test node

```
npm install
npx hardhat node
```

new terminal tab to deploy the contract

```
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
```

### Overview of this Repo

#### Contracts

##### Mixtape

The main mixtape contract. Mints mixtapes, which in turn mints SubtapeFactories.
Contains royalty information.

##### SubtapeFactory

The base contract for what a subtape factory looks like. Called a "factory" because it can mint N number of subtapes.
Possibly confusing term though.

##### SubtapeFactoryCreator

Mixtape inherits the SubtapeFactoryCreator contract, which provides structure for how to create new SubtapeFactories.

#### Deploy

Deploy scripts.

#### Test

Test cases.

### Local Testing

deploys the contracts and launches test node on 8545

```bash
npx hardhat node
```

### Things that I keep forgetting

When you call `_mint` you pass the tokenId, so as long as tokenId and the index within the array are the same, there really isn't any problem or need for functions in enumerable like `getIdAtIndex`...

we should be fine.

figure out how this royalty stuff works
make subtapes sellable?
make subtapes easily transferable
make subtapes inherit metdata
