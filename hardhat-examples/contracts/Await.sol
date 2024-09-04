// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "./nil/Nil.sol";

contract Await {
    using Nil for address;

    uint256 public result;

    function call(address dst) public{
        bytes memory temp;
        bool ok;
        (temp, ok) = Nil.awaitCall(
            dst,
            abi.encodeWithSignature("getValue()")
        );

        require(ok == true, "Result not true");

        result = abi.decode(temp, (uint256));
    }
}

