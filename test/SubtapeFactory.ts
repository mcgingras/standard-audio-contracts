const { expect } = require("chai");
import "@nomiclabs/hardhat-ethers";
import { ethers, deployments } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { SubtapeFactory } from "../typechain-types";

describe("Subtape factory contract", function () {
  let signer: SignerWithAddress;
  let signerAddress: string;
  let subtapeFactoryContract: SubtapeFactory;

  beforeEach(async function () {
    // get deployments from _deploy folder
    // returns what seems to be the ABI?
    const { SubtapeFactory } = await deployments.fixture(["SubtapeFactory"]);
    const subtapeFactoryAddress = (await deployments.get("SubtapeFactory"))
      .address;

    signer = (await ethers.getSigners())[0];
    signerAddress = await signer.getAddress();

    subtapeFactoryContract = (await ethers.getContractAt(
      "SubtapeFactory",
      subtapeFactoryAddress
    )) as SubtapeFactory;
  });

  describe("Sanity check...", () => {
    /*
     * tbd
     * tbd
     * tbd.
     */
    it("creates a new factory", async () => {});
  });
});
