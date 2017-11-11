/**
 * SolidityContract
 * Responsible for compiling and returning contract objects
 * */
const fs = require('fs');
const solc = require('solc');

const  FILE_ENCODING = 'utf8';

class SolidityContract {

    constructor(path, name) {
        const source = fs.readFileSync(path, this.FILE_ENCODING).toString();
        const contract = solc.compile(source, 1);
        console.log(contract);
        this.compiledContract = contract.contracts[`:${name}`];
    }

    getABI(contractName) {
        return this.compiledContract.interface;
    }

    getByteCode(contractName) {
        return this.compiledContract.bytecode;
    }
}

module.exports = SolidityContract;
