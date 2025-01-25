// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@nilfoundation/smart-contracts/contracts/NilBase.sol";

contract StateMachine is NilBase {
    enum Stages {
        Initialize,
        Processing,
        Completed,
        Failed
    }

    Stages public currentStage;
    
    uint256 public processValue;
    mapping(address => bool) public hasParticipated;
    
    event StageAdvanced(Stages newStage);
    event ProcessValueUpdated(uint256 newValue);

    modifier atStage(Stages _stage) {
        require(currentStage == _stage, "Invalid stage");
        _;
    }

    modifier transitionAfter() {
        _;
        _nextStage();
    }

    constructor() {
        currentStage = Stages.Initialize;
    }

    function startProcess() external atStage(Stages.Initialize) transitionAfter {
        processValue = 0;
        emit ProcessValueUpdated(processValue);
    }

    function participate() external atStage(Stages.Processing) {
        require(!hasParticipated[msg.sender], "Already participated");
        
        hasParticipated[msg.sender] = true;
        processValue += 1;
        
        emit ProcessValueUpdated(processValue);
        
        if (processValue >= 5) {
            currentStage = Stages.Completed;
            emit StageAdvanced(Stages.Completed);
        }
    }

    function _nextStage() internal {
        currentStage = Stages(uint(currentStage) + 1);
        emit StageAdvanced(currentStage);
    }

    function reset() external onlyInternal {
        require(currentStage == Stages.Completed || currentStage == Stages.Failed, 
                "Can only reset from Completed or Failed state");
        currentStage = Stages.Initialize;
        processValue = 0;
        emit StageAdvanced(Stages.Initialize);
        emit ProcessValueUpdated(processValue);
    }
} 