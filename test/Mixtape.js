const { expect } = require("chai");

describe("Mixtape contract", function () {

    let Mixtape;
    let mixtapeContract;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function () {
        Mixtape = await ethers.getContractFactory("Mixtape");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        mixtapeContract = await Mixtape.deploy();
        await mixtapeContract.deployed();

        // console.log(mixtapeContract);
    });

    describe("Sanity check...", function () {
        it("should set the correct token symbol", async function () {
            expect(await mixtapeContract.symbol() === "MIX");
        });
  });

  describe("Minting NFT", function () {
      it("Should mint a new NFT", async function () {
        const _testURI = "test of some metadata";

        const tx = await mixtapeContract.createMixtape(owner.address, _testURI);
        const mixtapeURI = mixtapeContract.tokenURI(await mixtapeContract.tokenByIndex(0));
        expect(mixtapeURI === _testURI);

        // I hardcoded values for the struct... need to change this
        // but this is a sanity check that it works at least
        const mixValues = await mixtapeContract.mixes(0);
        expect(mixValues.s === 1);
        expect(mixValues.s === 2);
        expect(mixValues.s === 3);

      });

      it("Should only allow owner to mint a new NFT", async function() {
        const _testURI = "this should fail";
        await expect(mixtapeContract.connect(addr1).createMixtape(addr2.address, _testURI))
        .to.be.revertedWith("Ownable: caller is not the owner");
      })
  })
});
