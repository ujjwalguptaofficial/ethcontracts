// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract MyNFT is ERC721Burnable, IERC721Receiver {
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

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}
