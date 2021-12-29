const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');
// fs-extra is a community written module with some more functionality than fs

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);
// to remove the entire build directory

const CampaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(CampaignPath, 'utf8');

const output = solc.compile(source,1).contracts;

fs.ensureDirSync(buildPath);

// console.log(output);

// for each contract in this file, we want to create a new file in the build directory
for (let contract in output) {
    fs.outputJSONSync(
        path.resolve(buildPath, contract.replace(':','') + '.json'),
        output[contract]
    );
}