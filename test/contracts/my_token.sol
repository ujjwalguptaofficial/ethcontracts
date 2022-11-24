// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract MyToken is Initializable, OwnableUpgradeable, ERC20Upgradeable {
    function initialize(string memory name, string memory symbol)
        external
        initializer
    {
        __Ownable_init();
        __ERC20_init(name, symbol);
    }

    function mint(address account, uint256 amount) external {
        _mint(account, amount);
    }
}
