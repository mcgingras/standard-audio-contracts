const { expect } = require("chai");
const { BigNumber } = require("ethers");

const ZERO_BYTES32 =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

describe("Subtape factory contract", function () {
  let Subtape;
  let SubtapeCreator;
  let SubtapeContract;
  let owner;
  let addr1;
  let addr2;
  let addrs;
  let contractAddr;
  let tree;

  beforeEach(async function () {
    Subtape = await ethers.getContractFactory("SubtapeFactory");
    SubtapeCreator = await ethers.getContractFactory("SubtapeFactoryCreator");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
  });

  describe("Sanity check...", function () {
    it("contracts deploy successfully", async function () {
      subtapeContract = await Subtape.deploy();
      await subtapeContract.deployed();
      subtapeContractAddr = subtapeContract.address;

      subtapeCreatorContract = await SubtapeCreator.deploy(subtapeContractAddr);
      await subtapeCreatorContract.deployed();
      subtapeCreatorContractAddr = subtapeCreatorContract.address;
      // expect((await mixtapeContract.symbol()) === "TAPE");
    });
  });

  describe("Factory creator works...", function () {
    it("Creates a factory", async function () {
      subtapeContract = await Subtape.deploy();
      await subtapeContract.deployed();
      subtapeContractAddr = subtapeContract.address;

      subtapeCreatorContract = await SubtapeCreator.deploy(subtapeContractAddr);
      await subtapeCreatorContract.deployed();
      subtapeCreatorContractAddr = subtapeCreatorContract.address;

      await subtapeCreatorContract.createSubtapeFactory("TEST", "T");

      const factory = await subtapeCreatorContract.getFactoryAtId(0);
      console.log(factory);
    });
  });
});
