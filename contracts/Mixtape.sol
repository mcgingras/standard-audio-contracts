//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;
import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Mixtape is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public constant CASSETTE_CREATION_LIMIT = 1000;
    uint256 public cassettesCreatedCount;

    bool public allCassettesClaimed = false;

    // does it matter if the names of variables are long or short
    // in terms of how much gas it cost to store the contract?
    struct Mix {
        uint16 s;  // <- capacity
        uint16 q;   // <- quality
        uint16 a; // <- appearance
    }

    /// @dev An array containing the Mix struct for all 1000 Mixtapes.
    Mix[] public mixes;

    /// @dev An offer to sell a cassette
    /// The owner of a cassette can offer to sell it for any price.
    /// similar to "Buy Now" on ebay.
    struct Offer {
        uint cassetteIndex;
        address seller;
        uint minValue;
    }

    /// @dev An bid on a cassette
    /// An interested party can place a bid on a cassette.
    /// The owner must accept the bid.
    /// similar to regular ebay auction, except no time period.
    /// todo: -- refund eth after certain time period and cancel bid.
    /// want to prevent buyer from never accepting which may lock up eth.
    struct Bid {
        bool activeBid;
        uint cassetteIndex;
        address bidder;
        uint amount;
    }

    mapping (uint => Bid) public cassetteBids;

    // probably want an event for when a new token is minted?

    constructor() public ERC721("CryptoCassettes", "MIX") {}

    /// @dev function to mint new Cassettes
    /// need to change the name to `createCassette` if thats what were going with
    /// required: only owner of contract can mint new tokens
    /// alternative strategy - anyone mints, but after 1000 this function is deprecated
    function createMixtape(address owner, string memory tokenURI, uint16 s,  uint16 q, uint16 a)
        public
        onlyOwner
        returns (uint256)
    {
        require(cassettesCreatedCount < CASSETTE_CREATION_LIMIT);
        mixes.push(Mix(s,q,a));

        uint256 newMixtapeId = _tokenIds.current();
        _mint(owner, newMixtapeId);
        _setTokenURI(newMixtapeId, tokenURI);

        cassettesCreatedCount++;
        _tokenIds.increment();

        return newMixtapeId;
    }

    /// @dev function for placing a bid on a cassette
    function bidForCassette(uint index) public payable {
        require(index < CASSETTE_CREATION_LIMIT);
        cassetteBids[index] = Bid(true, index, msg.sender, msg.value);
    }

    /// @dev function for accepting a bid on a cassette
    function acceptBidForCassette(uint index) public {
        require(ownerOf(index) == msg.sender); // <- require that caller owns token

        Bid storage bid = cassetteBids[index];
        _transfer(msg.sender, bid.bidder, index);
        msg.sender.transfer(bid.amount);
        cassetteBids[index] = Bid(false, index, address(0), 0);
    }
}
