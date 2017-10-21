const Ethers = require('ethers');
const EthersWallet = Ethers.Wallet;

class EtherWallet {
    
    constructor(privateKey) {
        if (privateKey) {
            this.wallet = new EthersWallet(privateKey);
            this.address = this.wallet.address;
            this.privateKey = privateKey;
        }
    }
}

module.exports = EtherWallet;
