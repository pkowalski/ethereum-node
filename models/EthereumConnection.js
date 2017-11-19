/**
 * Creates a connection to the provided etherRPC
 * */
const Web3Library = require('web3');

const DEFAULT_UNLOCK_TIME = 15000;

class EthereumConnection {

    constructor(url) {
        const web3 = new Web3Library();
        web3.setProvider(new web3.providers.HttpProvider(url));
        this.web3 = web3;
        if (!this.web3.isConnected()){
            throw new Error('Unable to connect');
        }
    }

    pushContract(sender, contract, ...params) {
        const parsedContract = this.getParsedContract(contract);
        return parsedContract.new(...params, {
            from: sender,
            data: `0x${contract.getByteCode()}`,
            gas: `0x${this.getGasEstimate(contract.getByteCode())}`,
        }, function(err, pushedContract) {
            console.log('return');
            if (err) {
                console.log('error');
                console.log(err);
                return {};
            }
            if (!pushedContract.address) {
                console.log(`hash: ${pushedContract.transactionHash}`);
                return {};
            }
            console.log(`address ${pushedContract.address}`);
            return pushedContract;
        });
    }
    
    getGasEstimate(data) {
       return this.web3.eth.estimateGas({ data: `0x${data}` }); 
    }

    unlockAccount(address, password, seconds = DEFAULT_UNLOCK_TIME) {
        return this.web3.personal.unlockAccount(address, password, seconds);
    }

    getBalance(address) {
        return this.web3.eth.getBalance(address);
    }

    getParsedContract(contract) {
        return this.web3.eth.contract(JSON.parse(contract.getABI()));
    }

    getContractInstance(parsedContract, address) {
        return parsedContract.at(address);
    }

    callContractFunction(contract, address, func, ...params){
        const parsedContract = this.getParsedContract(contract);
        
        const contractInstance = this.getContractInstance(
            parsedContract, parsedContract.address);
            console.log('hereere');
        console.log(contractInstance.greet());
    }
}

module.exports = EthereumConnection;