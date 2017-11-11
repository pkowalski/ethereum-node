const Ethers = require('ethers');
const fs = require('fs');
const EthersWallet = Ethers.Wallet;

class EtherWallet {
    
    static buildFromWalletJSON(jsonFile, password) {
        const secretFile = fs.readFileSync(jsonFile).toString();
        return EthersWallet.fromEncryptedWallet(secretFile, password)
        .then((wallet) => {
            const etherWallet = new EtherWallet();
            etherWallet.wallet = wallet;
            etherWallet.address = wallet.address;
            return etherWallet;
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

module.exports = EtherWallet;
