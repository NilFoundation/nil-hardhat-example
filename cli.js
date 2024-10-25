#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Get the project directory
const projectDir = process.argv[2] || 'new-nil-project';
const projectPath = path.join(process.cwd(), projectDir);

console.log(`Creating a new project in ${projectDir}...`);

// Create the directory for the new project
fs.mkdirSync(projectPath, { recursive: true });

function createPackageJson() {
    const packageJsonContent = {
        name: path.basename(projectDir),
        version: "1.0.0",
        description: "A new project on the =nil; platform",
        main: "index.js",
        scripts: {
            tests: "npx hardhat test --network nil",
            lint: "biome check ignition/modules test",
            "lint:fix": "biome check --write ignition/modules test"
        },
        dependencies: {},
        devDependencies: {
            "@nilfoundation/hardhat-plugin": "^0.15.0",
            "@nomicfoundation/hardhat-ethers": "^3.0.6",
            "@nomicfoundation/hardhat-toolbox": "^5.0.0",
            "dotenv": "^16.4.5",
            "ts-node": "^10.9.2",
            "@nilfoundation/smart-contracts": "^0.1.4",
        },
    };

    fs.writeFileSync(
        path.join(projectPath, 'package.json'),
        JSON.stringify(packageJsonContent, null, 2) + '\n'
    );

    console.log('Created package.json');
}

function copyFile(srcFilePath, destFilePath) {
    const fullSrcPath = path.join(process.cwd(), srcFilePath);
    const fullDestPath = path.join(projectPath, destFilePath);

    // Ensure the destination directory exists
    fs.mkdirSync(path.dirname(fullDestPath), { recursive: true });

    // Copy the file if it exists
    if (fs.existsSync(fullSrcPath)) {
        fs.copyFileSync(fullSrcPath, fullDestPath);
    } else {
        console.warn(`File not found: ${srcFilePath}`);
    }
}

createPackageJson();
copyFile('.env.example', '.env');
copyFile('ignition/modules/Incrementer.ts', 'ignition/modules/Incrementer.ts');
copyFile('contracts/Incrementer.sol', 'contracts/Incrementer.sol');

console.log('Project setup complete!');
