const { ERC20, Web3Client, EthersClient } = require("@opweb3/ethcontracts");
const Web3 = require("web3");
const { providers, Contract } = require("ethers");
const abi = require("../abi/erc20.json");

const token = new ERC20('0x8f3cf7ad23cd3cadbd9735aff958023239c6a063');

async function init() {
    const provider = new providers.JsonRpcProvider('https://polygon-rpc.com');


    // const provider = new Web3.providers.HttpProvider('https://polygon-rpc.com');
    const client = new EthersClient(provider);
    await token.init(
        client
    );
    // console.log(client.walletAddress);
    // const balance = await token.getBalance("0xd5D3F35Bdd08950CCFE0DeAb638F8B5498297076");
    // console.log("balance", balance);

    // const totalSupply = await token.getTotalSupply();
    const totalSupply = await token.transactionData.approve(
        "0xd5D3F35Bdd08950CCFE0DeAb638F8B5498297076", 5000
    );
    console.log("totalSupply", totalSupply);
}

init();
