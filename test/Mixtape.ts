const { expect } = require("chai");
import "@nomiclabs/hardhat-ethers";
import { ethers, deployments } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";
import { Mixtape, SubtapeFactory } from "../typechain-types";
const { TapeTree } = require("../src/tape-tree.js");

/*
 * Tests for the MXTape contract
 */
describe("MIXTAPE CONTRACT", function () {
  let signer: SignerWithAddress;
  let signerAddress: string;
  let mixtape: Mixtape;

  beforeEach(async function () {
    const { Mixtape } = await deployments.fixture([
      "SubtapeFactory",
      "SubtapeFactoryCreator",
      "Mixtape",
    ]);

    mixtape = (await ethers.getContractAt(
      "Mixtape",
      Mixtape.address
    )) as Mixtape;

    signer = (await ethers.getSigners())[0];
    signerAddress = await signer.getAddress();
  });

  describe("Sanity check...", () => {
    it("mixtape contract has correct defaults set", async () => {
      expect(await mixtape.symbol()).to.be.equal("TAPE");
    });
  });

  describe("Minting checks", async () => {
    it("mints a tape", async () => {
      // make sure this is the same as the deploy script
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

      const DEMO_URI = "test of some metadata";
      const proof0 = tree.getProof(
        0,
        BigNumber.from(10),
        BigNumber.from(10),
        BigNumber.from(10)
      );

      expect(
        await mixtape.claim(
          0,
          BigNumber.from(10),
          BigNumber.from(10),
          BigNumber.from(10),
          proof0,
          DEMO_URI
        )
      ).to.emit(mixtape, "Claimed");
    });
  });

  describe("Post mint checks", async () => {
    // we want to have a tape to run checks against
    beforeEach(async () => {
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

      const DEMO_URI = "test of some metadata";
      const proof0 = tree.getProof(
        0,
        BigNumber.from(10),
        BigNumber.from(10),
        BigNumber.from(10)
      );

      await mixtape.claim(
        0,
        BigNumber.from(10),
        BigNumber.from(10),
        BigNumber.from(10),
        proof0,
        DEMO_URI
      );
    });

    it("belongs to the owner", async () => {
      expect(await mixtape.ownerOf(0)).to.be.equal(signerAddress);
    });

    it("generates a subtape factory", async () => {
      const subtapeFactory = await mixtape.getFactoryAtId(0);
      const subtapeContract = (await ethers.getContractAt(
        "SubtapeFactory",
        subtapeFactory
      )) as SubtapeFactory;

      expect(await subtapeContract.owner()).to.be.equal(signerAddress);
    });

    it("is able to mint subtapes", async () => {
      const subtapeFactory = await mixtape.getFactoryAtId(0);
      const subtapeContract = (await ethers.getContractAt(
        "SubtapeFactory",
        subtapeFactory
      )) as SubtapeFactory;

      await subtapeContract.mintSubtape(signerAddress);
      expect(await subtapeContract.ownerOf(0)).to.be.equal(signerAddress);
    });

    // this should not work...
    // not sure why it is showing a contract address
    it("Reverts when calling an empty factory...", async () => {
      // should be empty
      const subtapeFactory = await mixtape.getFactoryAtId(1);

      const subtapeContract = (await ethers.getContractAt(
        "SubtapeFactory",
        subtapeFactory
      )) as SubtapeFactory;

      // reverts, since there is no contact...
      await expect(subtapeContract.owner()).to.be.revertedWith(
        "call revert exception"
      );
    });
  });
});
