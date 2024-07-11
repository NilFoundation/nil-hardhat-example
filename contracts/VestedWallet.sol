// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Nil.sol";
import "hardhat/console.sol";

contract VestedWallet is NilBase {
    using Nil for address;

    address public beneficiary;
    uint256 public releaseTime;
    uint256 public amount;
    bool public released;

    constructor(address _beneficiary, uint256 _releaseTime) payable {
        beneficiary = _beneficiary;
        releaseTime = _releaseTime;
        amount = msg.value;
        released = false;
    }

    function release() public payable onlyInternal {
        console.log("Current timestamp", block.timestamp);
        console.log("Status", released);
        console.log("Balance", address(this).balance);

        require(
            block.timestamp >= releaseTime,
            "The current timestamp is before the specified release time"
        );
        require(!released, "Funds have already been released");
        require(
            address(this).balance >= amount,
            "The requested amount of funds is greater than the wallet balance"
        );

        released = true;
        payable(beneficiary).transfer(amount);
    }
}