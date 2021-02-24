//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;
import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Mixtape is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // does it matter if the names of variables are long or short
    // in terms of how much gas it cost to store the contract?
    struct Mix {
        uint16 s;  // <- size
        uint8 q;   // <- quality
        uint256 a; // <- appearance
    }

    /// @dev An array containing the Mix struct for all 1000 Mixtapes.
    Mix[] public mixes;

    // probably want an event for when a new token is minted?

    constructor() public ERC721("CryptoCassettes", "MIX") {}

    /// @dev function to mint new Cassettes
    /// need to change the name to `createCassette` if thats what were going with
    /// required: only owner of contract can mint new tokens
    /// alternative strategy - anyone mints, but after 1000 this function is deprecated
    function createMixtape(address owner, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        mixes.push(Mix(1,2,3));

        _tokenIds.increment();

        uint256 newMixtapeId = _tokenIds.current();
        _mint(owner, newMixtapeId);
        _setTokenURI(newMixtapeId, tokenURI);

        return newMixtapeId;
    }
}
