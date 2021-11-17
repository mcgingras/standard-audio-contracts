const { expect } = require("chai");
import "@nomiclabs/hardhat-ethers";
import { ethers, deployments } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { SubtapeFactory } from "../typechain-types";

/*
 * Tests for the subtape factory.
 * Right now I am calling child tapes of the original series "subtapes".
 * The contract is thus the "Subtape Factory" becuase it churns out
 * possibly infinte amounts of a given subtape.
 *
 * The purpose of this test case suite is to  test the functions found
 * in the subtape template contract. The test suite "SubtapeFactoryCreator"
 * is responsible for testing the Factory of the Factory aka the contract
 * that is responsible for initializing new ERC721 contracts each time an
 * original series MXTAPE is purchased.
 */
describe("Subtape factory contract", function () {
  let signer: SignerWithAddress;
  let signerAddress: string;
  let subtapeFactoryContract: SubtapeFactory;

  beforeEach(async function () {
    // get deployments from _deploy folder
    // returns what seems to be the ABI?
    // what to figure out what sort of typespec the deployment is
    // its a bit confusing how all of these things work together
    const { SubtapeFactory } = await deployments.fixture(["SubtapeFactory"]);
    const subtapeFactoryAddress = (await deployments.get("SubtapeFactory"))
      .address;

    signer = (await ethers.getSigners())[0];
    signerAddress = await signer.getAddress();

    subtapeFactoryContract = (await ethers.getContractAt(
      "SubtapeFactory",
      subtapeFactoryAddress
    )) as SubtapeFactory;

    // not 100% sold on the NAME and symbol
    // do we even need these?
    // not sure if they are required by ERC721 standard anymore
    // since OZ seems to have moved them into a "metadata" contract.
    await subtapeFactoryContract.initialize(
      signerAddress,
      "Child of 001",
      "bMXT"
    );
  });

  describe("Sanity check...", () => {
    /*
     * tbd
     * tbd
     * tbd.
     */
    it("initalization logic works", async () => {
      expect(await subtapeFactoryContract.name()).to.be.equal("Child of 001");
      expect(await subtapeFactoryContract.symbol()).to.be.equal("bMXT");
      expect(await subtapeFactoryContract.owner()).to.be.equal(signerAddress);
    });
  });
});
