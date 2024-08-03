//// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenErc20 is ERC20 {

    constructor(string memory _name, string memory _symbol, uint amount) ERC20(_name, _symbol) {
        _mint(msg.sender, amount * 10 ** decimals());
    }


}