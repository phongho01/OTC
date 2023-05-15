// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.16;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WETH is ERC20 {
    constructor(uint256 initialSupply) ERC20("Wrapped ETH", "WETH") {
        _mint(msg.sender, initialSupply);
    }

    function mint(uint256 _amount) external {
        _mint(msg.sender, _amount);
    }

    function mintTo(address _account, uint256 _amount) external {
        _mint(_account, _amount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
