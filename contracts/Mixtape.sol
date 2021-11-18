// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// need this is we want to enumerate all tokens
// combine tokenOfOwnerByIndex with balanceOf
// not sure if we want that yet though
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

// needed for custom URIs
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "./IMerkleVerifier.sol";
import "./SubtapeFactoryCreator.sol";

contract Mixtape is
    ERC721URIStorage,
    Ownable,
    IMerkleVerifier,
    SubtapeFactoryCreator
{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string public baseURI;
    uint256 public cassettesCreatedCount;
    uint256 public constant CASSETTE_CREATION_LIMIT = 1000;
    bytes32 public immutable override merkleRoot;
    mapping(uint256 => uint256) private claimedBitMap;
    bool public allCassettesClaimed = false;

    // does it matter if the names of variables are long or short
    // in terms of how much gas it cost to store the contract?
    struct Mix {
        uint8 capacity;
        uint8 quality;
        uint256 style;
    }

    /// @dev An array containing the Mix struct for all 1000 Mixtapes.
    Mix[] public mixes;

    // probably want an event for when a new token is minted?
    constructor(
        bytes32 merkleRoot_,
        string memory baseURI_,
        address _implementation
    ) ERC721("NFTapes", "TAPE") SubtapeFactoryCreator(_implementation) {
        merkleRoot = merkleRoot_;
        baseURI = baseURI_;
    }

    function isClaimed(uint256 index) public view override returns (bool) {
        uint256 claimedWordIndex = index / 256;
        uint256 claimedBitIndex = index % 256;
        uint256 claimedWord = claimedBitMap[claimedWordIndex];
        uint256 mask = (1 << claimedBitIndex);
        return claimedWord & mask == mask;
    }

    function _setClaimed(uint256 index) private {
        uint256 claimedWordIndex = index / 256;
        uint256 claimedBitIndex = index % 256;
        claimedBitMap[claimedWordIndex] =
            claimedBitMap[claimedWordIndex] |
            (1 << claimedBitIndex);
    }

    function claim(
        uint256 index,
        uint8 capacity,
        uint8 quality,
        uint256 style,
        bytes32[] calldata merkleProof,
        string memory tokenURI
    ) external override {
        require(!isClaimed(index), "Tape already claimed.");
        require(cassettesCreatedCount < CASSETTE_CREATION_LIMIT);

        bytes32 node = keccak256(
            abi.encodePacked(index, capacity, quality, style)
        );
        require(
            MerkleProof.verify(merkleProof, merkleRoot, node),
            "Invalid proof."
        );

        _setClaimed(index);
        mixes.push(Mix(capacity, quality, style));
        _mint(msg.sender, index);
        _setTokenURI(index, tokenURI);
        cassettesCreatedCount++;

        // I don't know if this is going to work, I'm a bit confused about how
        // contracts inherit from each other or what we are doing here...
        // SubtapeFactoryCreator.createSubtapeFactory("demo", "d");
        emit Claimed(index, capacity, quality, style);
    }

    /// @dev function for changing metadata on Cassette
    /// note: you could independently call this outside
    /// of the dapp and add as many songs as you'd like.
    /// There is no technical constraint imposing capacity
    /// within this solidity contract, its all front-end.
    /// -------------------------------------------------
    /// interesting question about what it means to own an NFT?
    /// are you buying it for the NFT (data) or ability to use experience
    function editMixtape(uint256 mixtapeId, string memory tokenURI) public {
        _setTokenURI(mixtapeId, tokenURI);
    }

    /// This is an override over the default OpenZepplin ERC721 contract
    /// that sets an empty string for the baseURI. I'm not yet sure if I
    /// actually want to use the baseURI at all, I'm not sure if it
    /// actually saves us any gas or anything. We could save the baseURI
    /// and hardcode it into our dapp, but others might need it, so it
    /// might help with interoperability and end up being a requirement.
    /// Either way, I'm going to leave it in here.
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }
}
