// const { expect } = require("chai");
// const { BigNumber } = require("ethers");

// const ZERO_BYTES32 =
//   "0x0000000000000000000000000000000000000000000000000000000000000000";

// describe("Subtape factory contract", function () {
//   let Subtape;
//   let SubtapeCreator;
//   let SubtapeContract;
//   let owner;
//   let addr1;
//   let addr2;
//   let addrs;
//   let contractAddr;
//   let tree;

//   beforeEach(async function () {
//     Subtape = await ethers.getContractFactory("SubtapeFactory");
//     SubtapeCreator = await ethers.getContractFactory("SubtapeFactoryCreator");
//     [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
//   });

//   describe("Sanity check...", function () {
//     it("contracts deploy successfully", async function () {
//       subtapeContract = await Subtape.deploy();
//       await subtapeContract.deployed();

//       subtapeContractAddr = subtapeContract.address;
//       // expect((await mixtapeContract.symbol()) === "TAPE");
//     });
//   });
// });