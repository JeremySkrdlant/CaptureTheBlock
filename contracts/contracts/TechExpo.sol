// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, ERC20Burnable, Ownable {
    string public serverName = "no-name";
    address public lastUpdater;
    uint public lastUpdate;
    mapping(address => uint) public freezeTimes;

    event NewOwner(address indexed owner, string indexed name);
    event ResetOccured();
    event Freeze(address indexed frozen);

    constructor(
        string memory tokenName,
        string memory tokenSymbol
    ) ERC20(tokenName, tokenSymbol) Ownable(msg.sender) {}

    function decimals() public pure override returns (uint8) {
        return 0;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    modifier notFrozen() {
        require(
            freezeTimes[msg.sender] + 30 < block.timestamp,
            "Oops, you are frozen"
        );
        _;
    }

    function collectToken() public notFrozen {
        require(lastUpdater == msg.sender, "You do not own the server");
        if (lastUpdate + 30 < block.timestamp) {
            _mint(msg.sender, 3);
            lastUpdate = block.timestamp;
            emit NewOwner(msg.sender, serverName);
        }
    }

    function attackUser(address _attackee) public {
        burn(1);
        freezeTimes[_attackee] = block.timestamp;
        emit Freeze(_attackee);
    }

    function updateName(string memory newName) public notFrozen {
        require(balanceOf(msg.sender) > 1, "You need Money to make money");
        burn(1);
        lastUpdater = msg.sender;
        serverName = newName;
        lastUpdate = block.timestamp;
        emit NewOwner(msg.sender, newName);
    }

    function getTimeOwnedInSeconds() public view returns (uint) {
        return block.timestamp - lastUpdate;
    }

    function resetContract() public {
        serverName = "no-name";
        lastUpdater = address(0);
        lastUpdate = 0;
        emit ResetOccured();
    }
}
