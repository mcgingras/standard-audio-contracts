const { expect } = require("chai");

/*
 Edge cases that still need testing --
 - If you mint a token, should not be able to mint a new token
   with the same index (overwriting it)
*/

describe("Mixtape contract", function () {

    let Mixtape;
    let mixtapeContract;
    let owner;
    let addr1;
    let addr2;
    let addrs;
    let contractAddr;

    // makes a new instance of thr contract each time
    // -- is that necessary?
    beforeEach(async function () {
        Mixtape = await ethers.getContractFactory("Mixtape");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        mixtapeContract = await Mixtape.deploy();
        await mixtapeContract.deployed();

        contractAddr = mixtapeContract.address;
    });

    describe("Sanity check...", function () {
        it("should set the correct token symbol", async function () {
            expect(await mixtapeContract.symbol() === "MIX");
        });
  });

  describe("Minting NFT", function () {
      it("Should mint a new NFT", async function () {
        const _testURI = "test of some metadata";

        const tx = await mixtapeContract.createMixtape(owner.address, _testURI, 1, 2, 3);
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
        await expect(mixtapeContract.connect(addr1).createMixtape(addr2.address, _testURI, 1, 2, 3))
        .to.be.revertedWith("Ownable: caller is not the owner");
      })
  })

  describe("Editing NFT", function () {
    it("Should allow user to edit NFT", async function() {
      const _newURI = "updated metadata";

      // are we sure this is the same mixtape as the last function call?
      // need to verify that these are not getting whiped out each time
      const tx = await mixtapeContract.editMixtape(0, _newURI);
      const mixtapeURI = mixtapeContract.tokenURI(await mixtapeContract.tokenByIndex(0));
      expect(mixtapeURI === _testURI);
    })
  })

  describe("Bidding on an NFT", function () {
      // setup bid so it is available
      beforeEach(async function() {
          const _testURI = "this should pass";
          const tx = await mixtapeContract.createMixtape(owner.address, _testURI, 1, 2, 3);
          const bidtx = await mixtapeContract.connect(addr1).bidForCassette(0, {value: ethers.utils.parseEther("10.0")});
      });

      it("Should place a bid successfully", async function () {
          const bid = await mixtapeContract.cassetteBids(0);

          expect(bid.bidder === addr1.address);
          expect(bid.cassetteIndex === 0);
          expect(bid.amount === ethers.utils.parseEther("1.0"));
      });

      it("Should accept bid successfully", async function () {
          const balanceBefore = await ethers.provider.getBalance(owner.address);
          const atx = await mixtapeContract.acceptBidForCassette(0);

          // should clear out bid
          const bid = await mixtapeContract.cassetteBids(0);
          expect(bid.bidder === 0x0);
          expect(bid.cassetteIndex === 0);
          expect(bid.amount === ethers.utils.parseEther("0.0"));

          // should transfer ownership
          const newOwner = await mixtapeContract.ownerOf(0);
          expect(newOwner === addr1.address);

          // should pay previous owner
          // the bid is for 10 eth, but it costs gas to accept bid so we cant check
          // that the profit is exactly 10.
          const balanceAfter = await ethers.provider.getBalance(owner.address);
          expect(ethers.utils.formatEther(balanceAfter) - ethers.utils.formatEther(balanceBefore) > 9.99)
      })

  })
});
