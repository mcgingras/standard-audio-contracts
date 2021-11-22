// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";

// the contract that this factory clones
import "./SubtapeFactory.sol";

contract SubtapeFactoryCreator {
    using Counters for Counters.Counter;

    /// Counter for current contract id upgraded
    Counters.Counter private contractCount;

    // the address of the contract we want to clone
    address public implementation;

    constructor(address _implementation) {
        implementation = _implementation;
    }

    /**
     * Creates a subtape factory.
     * @dev note:I want this function to be callable from the inheriting contract. I am not super great at
     * solidity yet, so I'm not totally sure what these access modifiers do. I had it set as external
     * but I was not able to call it from the inheriting function when it was external. Public was the
     * only way I could call it from the inheriting function AND test the functionality of this contract
     * on its own (sort of like unit testing the contract vs integration testing the main contract)
     * Anyways, I'm not sure if thats the right way to go about it, so if these contracts get audited that is
     * something I would want to check so I'm making a point of it here.
     */
    function createSubtapeFactory(string memory _name, string memory _symbol)
        public
        returns (uint256)
    {
        uint256 newId = contractCount.current();
        address newContract = Clones.cloneDeterministic(
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
                Clones.predictDeterministicAddress(
                    implementation,
                    bytes32(abi.encodePacked(factoryId)),
                    address(this)
                )
            );
    }
}
