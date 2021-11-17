const { expect } = require("chai");
const { TapeTree } = require("../src/tape-tree.js");
const { BigNumber } = require("ethers");

/*
 Edge cases that still need testing --
 - If you mint a token, should not be able to mint a new token
   with the same index (overwriting it)
*/

const ZERO_BYTES32 =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

describe("Mixtape contract", function () {
  let Mixtape;
  let mixtapeContract;
  let owner;
  let addr1;
  let addr2;
  let addrs;
  let contractAddr;
  let tree;

  beforeEach(async function () {
    Mixtape = await ethers.getContractFactory("Mixtape");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
  });

  describe("Sanity check...", function () {
    it("should set the correct token symbol", async function () {
      mixtapeContract = await Mixtape.deploy(ZERO_BYTES32);
      await mixtapeContract.deployed();

      contractAddr = mixtapeContract.address;
      expect((await mixtapeContract.symbol()) === "TAPE");
    });
  });

  describe("Simple merkle tree", function () {
    before("deploy", async () => {
      tree = new TapeTree([
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

      mixtapeContract = await Mixtape.deploy(tree.getHexRoot());
      await mixtapeContract.deployed();
    });

    it("Should allow valid claim the NFT", async function () {
      const _testURI = "test of some metadata";
      const proof0 = tree.getProof(
        0,
        BigNumber.from(10),
        BigNumber.from(10),
        BigNumber.from(10)
      );
      await expect(
        mixtapeContract.claim(
          0,
          BigNumber.from(10),
          BigNumber.from(10),
          BigNumber.from(10),
          proof0,
          _testURI
        )
      ).to.emit(mixtapeContract, "Claimed");

      const a = await mixtapeContract.tokenByIndex(0);
      const mixtapeURI = mixtapeContract.tokenURI(
        await mixtapeContract.tokenByIndex(0)
      );
      expect(mixtapeURI === _testURI);

      // I hardcoded values for the struct... need to change this
      // but this is a sanity check that it works at least
      // const mixValues = await mixtapeContract.mixes(0);
      // expect(mixValues.s === 1);
      // expect(mixValues.s === 2);
      // expect(mixValues.s === 3);
    });

    // it("Should disallow invalid claim", async function() {

    // });

    it("Should allow editing of NFT", async function () {
      const _newURI = "updated metadata";

      const tx = await mixtapeContract.editMixtape(0, _newURI);
      const mixtapeURI = mixtapeContract.tokenURI(
        await mixtapeContract.tokenByIndex(0)
      );
      expect(mixtapeURI === _newURI);
    });
  });
});
