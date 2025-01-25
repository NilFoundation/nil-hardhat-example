#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const PATTERNS = {
    'access': 'AccessRestriction.sol',
    'state': 'StateMachine.sol',
    'rate': 'RateLimiter.sol',
    'guard': 'GuardCheck.sol',
    'proxy': 'ProxyDelegate.sol',
    'check': 'CheckEffectsInteraction.sol'
};

function createPattern(patternName, projectPath) {
    if (!PATTERNS[patternName]) {
        console.error(`Invalid pattern name. Available patterns: ${Object.keys(PATTERNS).join(', ')}`);
        process.exit(1);
    }

    const templatePath = path.join(__dirname, '..', 'contracts', 'solidity_patterns', PATTERNS[patternName]);
    const destPath = path.join(projectPath, 'contracts', 'patterns', PATTERNS[patternName]);

    // Create directories if they don't exist
    fs.mkdirSync(path.join(projectPath, 'contracts', 'patterns'), { recursive: true });

    // Copy pattern file
    fs.copyFileSync(templatePath, destPath);
    console.log(`Created ${patternName} pattern at: ${destPath}`);
}

// Get command line arguments
const patternName = process.argv[2];
const projectDir = process.argv[3] || '.';

if (!patternName) {
    console.error('Please specify a pattern name');
    console.log(`Available patterns: ${Object.keys(PATTERNS).join(', ')}`);
    process.exit(1);
}

createPattern(patternName.toLowerCase(), path.resolve(projectDir)); 