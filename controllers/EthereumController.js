const EtherWallet = require('../models/EtherWallet');
const EthereumConnection = require('../models/EthereumConnection');
const SolidityContract = require('../models/SolidityContract');

function main(res, req) {
    const privateKey = '0xf4ff887a7ac05d391cfa8e05940cbacefc9db6fdc7259f757fd88c7053fc0619';
    const wallet = new EtherWallet(privateKey);
    const connection = new EthereumConnection('http://localhost:8454');
    const contract = new SolidityContract('./contracts/sampleContract', 'SampleContract');
    const pushedContract = connection.pushContract(contract);
}

module.exports = {
    main,
}