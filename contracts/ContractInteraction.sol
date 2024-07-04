// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Caller {
    ValueStorage private valueStorage;

    constructor(address _valueStorage) payable {
        valueStorage = ValueStorage(_valueStorage);
    }

    function callSetValue(uint256 _value) public payable {
        valueStorage.setAmount(_value);
    }

    function callGetValue() public view returns (uint256) {
        return valueStorage.getAmount();
    }
}

contract ValueStorage {
    uint256 public amount;

    constructor() payable {
    }

    function setAmount(uint256 _value) public payable {
        amount = _value;
    }

    function getAmount() public view returns (uint256) {
        return amount;
    }
}
