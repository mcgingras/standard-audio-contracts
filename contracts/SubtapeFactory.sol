// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import {IERC2981Upgradeable, IERC165Upgradeable} from "@openzeppelin/contracts-upgradeable/interfaces/IERC2981Upgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {CountersUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

/**
    This is a smart contract for handling "burned" mxtapes.
    @dev This allows you to create "burned" (copied) tapes of an original tape.
    @author michael gingras
    Repository: https://github.com/mcgingras/nftapes
*/
contract SubtapeFactory is ERC721Upgradeable, OwnableUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    CountersUpgradeable.Counter private mintedCount;

    function initialize(
        address _owner,
        string memory _name,
        string memory _symbol
    ) public initializer {
        __ERC721_init(_name, _symbol);
        __Ownable_init();
        transferOwnership(_owner);
    }

    function totalSupply() public view returns (uint256) {
        return mintedCount.current();
    }

    function mintSubtape(address to) external onlyOwner returns (uint256) {
        address[] memory toMint = new address[](1);
        toMint[0] = to;
        return _mintSubTapes(toMint);
    }

    function mintSubtapes(address[] memory recipients)
        external
        onlyOwner
        returns (uint256)
    {
        // require(isOwner);
        return _mintSubTapes(recipients);
    }

    /// just sanity check its not neccessary to have
    /// only owner on here too, right?
    function _mintSubTapes(address[] memory recipients)
        internal
        returns (uint256)
    {
        uint256 startAt = mintedCount.current();
        uint256 endAt = startAt + recipients.length - 1;
        while (mintedCount.current() <= endAt) {
            _mint(
                recipients[mintedCount.current() - startAt],
                mintedCount.current()
            );
            mintedCount.increment();
        }
        return mintedCount.current();
    }
}
