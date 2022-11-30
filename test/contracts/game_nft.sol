// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";

contract GameNFT is ERC1155 {
    uint256 public constant GOLD = 0;
    uint256 public constant SILVER = 1;
    uint256 public constant THORS_HAMMER = 2;
    uint256 public constant SWORD = 3;
    uint256 public constant SHIELD = 4;

    constructor() ERC1155("https://game.example/api/item/{id}.json") {
        //     _mint(msg.sender, GOLD, 10 ** 18, "");
        //     _mint(msg.sender, SILVER, 10 ** 27, "");
        //     _mint(msg.sender, THORS_HAMMER, 1, "");
        //     _mint(msg.sender, SWORD, 10 ** 9, "");
        //     _mint(msg.sender, SHIELD, 10 ** 9, "");
    }

    // function _baseURI() internal pure override returns (string memory) {
    //     return "https://mynft.com/";
    // }

    function mint(
        address account,
        uint256 tokenId,
        uint256 amount,
        bytes memory data
    ) external {
        _mint(account, tokenId, amount, data);
    }

    // function onERC1155Received(
    //     address operator,
    //     address from,
    //     uint256 tokenId,
    //     bytes calldata data
    // ) external returns (bytes4) {
    //     return IERC1155Receiver.onERC1155Received.selector;
    // }

    // function onERC1155BatchReceived(
    //     address operator,
    //     address from,
    //     uint256[] calldata ids,
    //     uint256[] calldata values,
    //     bytes calldata data
    // ) external returns (bytes4) {
    //     return IERC1155Receiver.onERC1155BatchReceived.selector;
    // }
}
