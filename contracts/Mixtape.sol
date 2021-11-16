// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
// IDK IF WE REALLY NEED IT TO BE ENUMERABLE
// ITS HELPFUL FOR TEST (???) BUT MAYBE USES MORE GAS SO NOT WORTH
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "./IMerkleVerifier.sol";

contract Mixtape is ERC721Enumerable, Ownable, IMerkleVerifier {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public constant CASSETTE_CREATION_LIMIT = 1000;
    uint256 public cassettesCreatedCount;
    bytes32 public immutable override merkleRoot;
    mapping(uint256 => uint256) private claimedBitMap;
    mapping(uint256 => string) private _tokenURIs;

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
    constructor(bytes32 merkleRoot_) public ERC721("NFTapes", "TAPE") {
        merkleRoot = merkleRoot_;
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

    function _setTokenURI(uint256 tokenId, string memory _tokenURI)
        internal
        virtual
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI set of nonexistent token"
        );
        _tokenURIs[tokenId] = _tokenURI;
    }
}
