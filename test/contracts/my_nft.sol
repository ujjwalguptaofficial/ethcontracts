// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://mynft.com/";
    }

    function mint(address account, uint256 tokenId) external {
        _mint(account, tokenId);
    }
}
