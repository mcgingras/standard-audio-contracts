const { expect } = require("chai");
const { BigNumber } = require("ethers");
import "@nomiclabs/hardhat-ethers";
import { ethers, deployments } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { SubtapeFactoryCreator, SubtapeFactory } from "../typechain-types";

describe("Subtape factory contract", function () {
  let signer: SignerWithAddress;
  let signerAddress: string;
  let subtapeFactoryCreator: SubtapeFactoryCreator;

  beforeEach(async function () {
    // get deployments from _deploy folder
    // returns what seems to be the ABI?
    const { SubtapeFactoryCreator } = await deployments.fixture([
      "SubtapeFactory",
      "SubtapeFactoryCreator",
    ]);

    const subtapeFactoryAddress = (await deployments.get("SubtapeFactory"))
      .address;

    subtapeFactoryCreator = (await ethers.getContractAt(
      "SubtapeFactoryCreator",
      SubtapeFactoryCreator.address
    )) as SubtapeFactoryCreator;

    signer = (await ethers.getSigners())[0];
    signerAddress = await signer.getAddress();
  });

  describe("Sanity check...", () => {
    it("creates a new factory", async () => {
      await subtapeFactoryCreator.createSubtapeFactory("TEST FACTORY", "TF");
      const subtapeFactory0 = await subtapeFactoryCreator.getFactoryAtId(0);

      const subtapeContract = (await ethers.getContractAt(
        "SubtapeFactory",
        subtapeFactory0
      )) as SubtapeFactory;

      expect(await subtapeContract.name()).to.be.equal("TEST FACTORY");
      expect(await subtapeContract.symbol()).to.be.equal("TF");
    });

    /*
     * The idea here is that we want people claiming tapes to be the owners
     * of the factories. Having an OG tape should give you rights to the
     * factory.
     */
    it("creates a new factory from a different account", async () => {
      // pass
    });

    /*
     * If you transfer or sell your OG tape, you should transfer the rights
     * of your factory as well.
     */
    it("Tranferring ownership of OG Tape transfers ownership of factory", async () => {
      // pass
    });
  });
});
