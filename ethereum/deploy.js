const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const compiledFactory = require("./build/CampaignFactory.json");
const interface = compiledFactory.interface;
const bytecode = compiledFactory.bytecode;

let mnemonic = '';

const fs = require('fs');
const mnemonic = fs.readFileSync("secret").toString().trim();
const infura_key = fs.readFileSync("infura_key").toString().trim();

const provider = new HDWalletProvider(
  mnemonic,
  infura_key,
);
const web3 = new Web3(provider);

const deploy = async () => {
  console.log(interface);

  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: "1000000", from: accounts[0], gasPrice: "5000000000" });

  console.log("Contract deployed to", result.options.address);
};
deploy();
