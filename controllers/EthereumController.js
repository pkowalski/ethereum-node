const EtherWallet = require('../models/EtherWallet');
const EthereumConnection = require('../models/EthereumConnection');
const SolidityContract = require('../models/SolidityContract');

function main(req, res) {
    const connection = new EthereumConnection(process.env.ETHER_NET_URL);
    const contract = new SolidityContract('contracts/Greeter.sol', 'greeter');
    EtherWallet.buildFromWalletJSON(process.env.WALLET_FILE, process.env.WALLET_PASSWORD)
    .then((wallet) => {
        const etherWallet = wallet;
        connection.unlockAccount(etherWallet.address, process.env.WALLET_PASSWORD);
        const pushedContract = connection.pushContract(etherWallet.address, contract, 'jambo');
        connection.callContractFunction(contract, pushedContract.address);
        //res.send({ contract: pushedContract.address});
    })
    .catch((err) => {
        console.log(err);
        res.status(500, { error: err });
    })
}

function getBalance(req, res) {
    const connection = new EthereumConnection(process.env.ETHER_NET_URL);
    return res.send({ balance: connection.getBalance(req.query.address) });
}

module.exports = {
    main,
    getBalance,
}