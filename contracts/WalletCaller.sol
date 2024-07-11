// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Nil.sol";

contract WalletCaller is NilBase {
    using Nil for address;

    constructor() payable {}

    function requestRelease(address dst) public payable {
        dst.asyncCall(
            msg.sender,
            msg.sender,
            100000,
            false,
            100000 * 10,
            abi.encodeWithSignature("release()")
        );
    }
}