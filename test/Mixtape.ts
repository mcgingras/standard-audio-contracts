const { expect } = require("chai");
import "@nomiclabs/hardhat-ethers";
import { ethers, deployments } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Mixtape, SubtapeFactory } from "../typechain-types";

/*
 * Tests for the MXTape contract
 */
describe("Subtape factory contract", function () {
  let signer: SignerWithAddress;
  let signerAddress: string;
  let mixtape: Mixtape;

  beforeEach(async function () {
    const { Mixtape } = await deployments.fixture([
      "SubtapeFactory",
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
});
