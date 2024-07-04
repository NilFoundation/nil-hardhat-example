// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Airdrop {
    mapping(address => uint) failTransferList;

    constructor() payable {
    }

    function multiTransferToken(
        address _token,
        address[] calldata _addresses,
        uint256[] calldata _amounts
    ) external payable {
        require(
            _addresses.length == _amounts.length,
            "Lengths of Addresses and Amounts NOT EQUAL"
        );
        AirdropErc20 token = AirdropErc20(_token);

        for (uint256 i; i < _addresses.length; i++) {
            token.transferFrom(msg.sender, _addresses[i], _amounts[i]);
        }
    }

    function withdrawFromFailList(address _to) public payable {
        uint failAmount = failTransferList[msg.sender];
        require(failAmount > 0, "You are not in failed list");
        failTransferList[msg.sender] = 0;
        (bool success,) = _to.call{value: failAmount}("");
        require(success, "Fail withdraw");
    }
}

contract AirdropErc20 {
    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowance;
    uint256 public totalSupply;
    string public name;
    string public symbol;
    uint8 public decimals = 18;

    constructor(string memory _name, string memory _symbol) payable {
        name = _name;
        symbol = _symbol;
    }

    function transfer(
        address recipient,
        uint amount
    ) public payable returns (bool) {
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        return true;
    }

    function approve(
        address spender,
        uint amount
    ) public payable returns (bool) {
        allowance[msg.sender][spender] = amount;
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) public payable returns (bool) {
        allowance[sender][msg.sender] -= amount;
        balances[sender] -= amount;
        balances[recipient] += amount;
        return true;
    }

    function mint(uint amount) external payable {
        balances[msg.sender] += amount;
        totalSupply += amount;
    }

    function burn(uint amount) external payable {
        balances[msg.sender] -= amount;
        totalSupply -= amount;
    }

    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }
}