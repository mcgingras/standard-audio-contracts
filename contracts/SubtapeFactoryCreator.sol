// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import {ClonesUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/ClonesUpgradeable.sol";
import {CountersUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

// the contract that this factory clones
import "./SubtapeFactory.sol";

contract SubtapeFactoryCreator {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    /// Counter for current contract id upgraded
    CountersUpgradeable.Counter private contractCount;

    // the address of the contract we want to clone
    address public implementation;

    constructor(address _implementation) {
        implementation = _implementation;
    }

    // Create a new factory
    function createSubtapeFactory(string memory _name, string memory _symbol)
        external
        returns (uint256)
    {
        uint256 newId = contractCount.current();
        address newContract = ClonesUpgradeable.cloneDeterministic(
            implementation,
            bytes32(abi.encodePacked(newId))
        );

        SubtapeFactory(newContract).initialize(msg.sender, _name, _symbol);

        contractCount.increment();
        return newId;
    }

    // Get the factory fiven the created ID
    function getFactoryAtId(uint256 factoryId)
        external
        view
        returns (SubtapeFactory)
    {
        return
            SubtapeFactory(
                ClonesUpgradeable.predictDeterministicAddress(
                    implementation,
                    bytes32(abi.encodePacked(factoryId)),
                    address(this)
                )
            );
    }
}
