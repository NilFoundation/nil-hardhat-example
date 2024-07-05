// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Wallet {
    address public owner;

    event Deposit(address indexed sender, uint amount);
    event Withdrawal(address indexed receiver, uint amount);
    event Transfer(address indexed from, address indexed to, uint amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() payable {
        owner = msg.sender;
    }

    // Function to deposit ether into the wallet
    function deposit() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    // Function to withdraw ether from the wallet
    function withdraw(uint _amount) external payable onlyOwner {
        require(address(this).balance >= _amount, "Insufficient balance");
        payable(owner).transfer(_amount);
        emit Withdrawal(owner, _amount);
    }

    // Function to transfer ether to another address
    function transfer(address payable _to, uint _amount) external payable onlyOwner {
        require(address(this).balance >= _amount, "Insufficient balance");
        _to.transfer(_amount);
        emit Transfer(owner, _to, _amount);
    }

    // Fallback function to receive ether
    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    // Function to check the balance of the wallet
    function getBalance() external view returns (uint) {
        return address(this).balance;
    }
}
