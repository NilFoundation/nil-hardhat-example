// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@nilfoundation/smart-contracts/contracts/NilBase.sol";

contract RateLimiter is NilBase {
    uint256 public constant RATE_LIMIT_PERIOD = 1 hours;
    uint256 public constant MAX_REQUESTS_PER_PERIOD = 5;

    mapping(address => uint256) public lastRequestTimestamp;
    mapping(address => uint256) public requestsInCurrentPeriod;

    event RequestProcessed(address indexed user, uint256 timestamp);
    event PeriodReset(address indexed user, uint256 timestamp);

    modifier rateLimited() {
        require(_checkRateLimit(msg.sender), "Rate limit exceeded");
        _;
    }

    function _checkRateLimit(address user) internal returns (bool) {
        uint256 currentPeriod = block.timestamp / RATE_LIMIT_PERIOD;
        uint256 lastPeriod = lastRequestTimestamp[user] / RATE_LIMIT_PERIOD;

        if (currentPeriod > lastPeriod) {
            requestsInCurrentPeriod[user] = 0;
            emit PeriodReset(user, block.timestamp);
        }

        if (requestsInCurrentPeriod[user] >= MAX_REQUESTS_PER_PERIOD) {
            return false;
        }

        requestsInCurrentPeriod[user]++;
        lastRequestTimestamp[user] = block.timestamp;
        emit RequestProcessed(user, block.timestamp);
        
        return true;
    }

    function processRequest() external rateLimited returns (bool) {
        // Simulated processing logic
        return true;
    }

    function getRemainingRequests(address user) external view returns (uint256) {
        uint256 currentPeriod = block.timestamp / RATE_LIMIT_PERIOD;
        uint256 lastPeriod = lastRequestTimestamp[user] / RATE_LIMIT_PERIOD;

        if (currentPeriod > lastPeriod) {
            return MAX_REQUESTS_PER_PERIOD;
        }

        return MAX_REQUESTS_PER_PERIOD - requestsInCurrentPeriod[user];
    }
} 