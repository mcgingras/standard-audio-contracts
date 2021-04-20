// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0;

interface IMerkleVerifier {
    // Returns the merkle root of the merkle tree containing account balances available to claim.
    function merkleRoot() external view returns (bytes32);
    // Returns true if the index has been marked claimed.
    function isClaimed(uint256 index) external view returns (bool);
    // Claim the given amount of the token to the given address. Reverts if the inputs are invalid.
    function claim(uint256 index, uint8 capacity, uint32 quality, uint32 style, bytes32[] calldata merkleProof) external;
    // This event is triggered whenever a call to #claim succeeds.
    event Claimed(uint256 index, uint8 capacity, uint32 quality, uint32 style);
}