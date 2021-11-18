// const { expect } = require("chai");
// const { TapeTree } = require("../src/tape-tree.js");
// import { BigNumber, ContractFactory, Contract } from "ethers";
// import { ethers } from "hardhat";
// import { Mixtape } from "../typechain-types";
// /*
//  Edge cases that still need testing --
//  - If you mint a token, should not be able to mint a new token
//    with the same index (overwriting it)
// */

// const ZERO_BYTES32 =
//   "0x0000000000000000000000000000000000000000000000000000000000000000";

// describe("Mixtape contract", function () {
//   let Mixtape: ContractFactory;
//   let mixtapeContract: Contract;
//   let owner;
//   let addr1;
//   let addr2;
//   let addrs;
//   let contractAddr;
//   let tree: any;

//   const BASE_URI = "https://pinata.cloud";

//   beforeEach(async function () {
//     Mixtape = await ethers.getContractFactory("Mixtape");
//     [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
//   });

//   describe("Sanity check...", function () {
//     it("should set the correct token symbol", async function () {
//       mixtapeContract = await Mixtape.deploy(ZERO_BYTES32, BASE_URI);
//       await mixtapeContract.deployed();

//       contractAddr = mixtapeContract.address;
//       expect((await mixtapeContract.symbol()) === "TAPE");
//     });

//     it("should overwrite the baseURI from the OZ contract", async () => {
//       expect(await mixtapeContract.baseURI()).to.be.equal(BASE_URI);
//     });
//   });

//   describe("Simple merkle tree", function () {
//     before("deploy", async () => {
//       tree = new TapeTree([
//         {
//           capacity: BigNumber.from(10),
//           quality: BigNumber.from(10),
//           style: BigNumber.from(10),
//         },
//         {
//           capacity: BigNumber.from(10),
//           quality: BigNumber.from(10),
//           style: BigNumber.from(10),
//         },
//       ]);

//       mixtapeContract = await Mixtape.deploy(tree.getHexRoot(), BASE_URI);
//       await mixtapeContract.deployed();
//     });

//     it("Should allow valid claim the NFT", async function () {
//       const _testURI = "test of some metadata";
//       const proof0 = tree.getProof(
//         0,
//         BigNumber.from(10),
//         BigNumber.from(10),
//         BigNumber.from(10)
//       );
//       await expect(
//         mixtapeContract.claim(
//           0,
//           BigNumber.from(10),
//           BigNumber.from(10),
//           BigNumber.from(10),
//           proof0,
//           _testURI
//         )
//       ).to.emit(mixtapeContract, "Claimed");

//       const mixtapeURI = mixtapeContract.tokenURI(0);
//       expect(mixtapeURI === _testURI);

//       // I hardcoded values for the struct... need to change this
//       // but this is a sanity check that it works at least
//       // const mixValues = await mixtapeContract.mixes(0);
//       // expect(mixValues.s === 1);
//       // expect(mixValues.s === 2);
//       // expect(mixValues.s === 3);
//     });

//     // it("Should disallow invalid claim", async function() {

//     // });

//     it("Should allow editing of NFT", async function () {
//       const _newURI = "updated metadata";

//       await mixtapeContract.editMixtape(0, _newURI);
//       const mixtapeURI = mixtapeContract.tokenURI(0);
//       expect(mixtapeURI === _newURI);
//     });
//   });
// });
