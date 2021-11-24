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
describe("SUBTAPE FACTORY CONTRACT", function () {
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

  describe("Minting functions", () => {
    it("mints a subtape to self", async () => {});

    it("mints a subtape to a new address", async () => {
      let addr2Signer: SignerWithAddress;
      let addr2: string;

      addr2Signer = (await ethers.getSigners())[1];
      addr2 = await addr2Signer.getAddress();

      await subtapeFactoryContract.mintSubtape(addr2);
      expect(await subtapeFactoryContract.ownerOf(0)).to.be.equal(addr2);
    });

    // wondering what the gas implications are of minting
    // many tapes at once? How to compare gas...
    it("mints many tapes at once", async () => {
      const signers: SignerWithAddress[] = await ethers.getSigners();
      const first_three_signers: SignerWithAddress[] = signers.splice(1, 3);
      const first_three_addresses: string[] = first_three_signers.map(
        (signer) => signer.address
      );

      await subtapeFactoryContract.mintSubtapes(first_three_addresses);
      expect(await subtapeFactoryContract.ownerOf(0)).to.be.equal(
        first_three_addresses[0]
      );
      expect(await subtapeFactoryContract.ownerOf(1)).to.be.equal(
        first_three_addresses[1]
      );
      expect(await subtapeFactoryContract.ownerOf(2)).to.be.equal(
        first_three_addresses[2]
      );
    });
  });

  describe("Checking supply", () => {
    // const to toggle amount of tapes if need be...
    const NUM_TAPES = 3;

    // We want to seed the contract with a few subtapes for each test case
    // so we can test functions that rely on the existance of tapes
    beforeEach(async () => {
      const signers: SignerWithAddress[] = await ethers.getSigners();
      const first_n_signers: SignerWithAddress[] = signers.splice(1, NUM_TAPES);
      const first_n_addresses: string[] = first_n_signers.map(
        (signer) => signer.address
      );

      await subtapeFactoryContract.mintSubtapes(first_n_addresses);
    });

    it("returns the amount of tapes in circulation", async () => {
      expect(await subtapeFactoryContract.totalSupply()).to.be.equal(NUM_TAPES);
    });

    it("gets all of the subtapes of a given address", async () => {
      // not sure you can do this without enumerating, but it would be cool and helpful.
    });
  });

  describe("Royalty info", () => {
    it("calculates royalty info", async () => {
      const payout = await subtapeFactoryContract.royaltyInfo(
        0,
        ethers.utils.parseEther("1.0")
      );
      const toAddress = payout.receiver;
      const amount = payout.royaltyAmount;

      expect(toAddress).to.equal(signerAddress);
      expect(amount).to.equal(ethers.utils.parseEther("0.05"));
    });
  });
});
