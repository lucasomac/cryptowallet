const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

//bitcoin - rede princila - mainnet
//testnet - rede de teste - testnet
const network = bitcoin.networks.testnet;

//Derivacao de carteiras HD
const path = "m/49'/1'/0'/0/0";
//Mnemonic para  gerar a seed
let mnemonic = bip39.generateMnemonic();
let seed = bip39.mnemonicToSeedSync(mnemonic);
//Raiz da árvore de derivacao
let root = bip32.fromSeed(seed, network);
//Criando uma conta - par pvt/pub
let account = root.derivePath(path);

let btcAddress = bitcoin.payments.p2wpkh({pubkey: account.publicKey,network: network}).address;

console.log('Wallet Information');
console.log('Address: ', btcAddress);
console.log('Private Key: ', account.toWIF());
console.log('Public Key: ', account.publicKey.toString('hex'));
console.log('Seed: ', mnemonic);


