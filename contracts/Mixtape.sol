//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.7.0;
import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Mixtape is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() public ERC721("Mixtape", "MIX") {}

    function createMixtape(address owner, string memory tokenURI)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newMixtapeId = _tokenIds.current();
        _mint(owner, newMixtapeId);
        _setTokenURI(newMixtapeId, tokenURI);

        return newMixtapeId;
    }
}
