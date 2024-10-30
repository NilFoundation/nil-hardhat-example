// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@nilfoundation/smart-contracts/contracts/Nil.sol";

contract SendRequest {
    using Nil for address;

    mapping (string => uint256) public values;
    uint256 receivedValue;
    string public constant RANDOM_STORAGE= "RANDOM_STORAGE";

    function call(address to) public payable {
        bytes memory context = abi.encodeWithSelector(this.resolve.selector, RANDOM_STORAGE);
        bytes memory callData = abi.encodeWithSignature("getValue()");
        Nil.sendRequest(to, 0, Nil.ASYNC_REQUEST_MIN_GAS, context, callData);
    }

    function resolve(
        bool success,
        bytes memory returnData,
        bytes memory context
    ) public payable {
        require(success, "SendRequest: call failed");
        (string memory from) = abi.decode(context, (string));
        uint256 value = abi.decode(returnData, (uint256));
        values[from] = value;
        receivedValue = value;
    }
}