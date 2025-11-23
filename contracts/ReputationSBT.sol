// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ReputationSBT is ERC721, Ownable {
    uint256 public nextId;
    mapping(uint256 => string) public metadataURI;
    mapping(address => uint256) public ownerToToken;

    constructor() ERC721("DeAI Provider SBT", "DPSBT") {}

    function mintForProvider(address provider, string memory uri) external onlyOwner returns (uint256) {
        require(ownerToToken[provider] == 0, "Already minted");
        nextId++;
        uint256 tokenId = nextId;
        _safeMint(provider, tokenId);
        metadataURI[tokenId] = uri;
        ownerToToken[provider] = tokenId;
        return tokenId;
    }

    // disable transfers (soulbound) by overriding _transfer (works with OZ v4)
    function _transfer(address, address, uint256) internal virtual override {
        revert("SBT: non-transferable");
    }

    function setMetadata(uint256 tokenId, string memory uri) external onlyOwner {
        metadataURI[tokenId] = uri;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return metadataURI[tokenId];
    }
}