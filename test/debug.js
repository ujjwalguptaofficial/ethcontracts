const { ERC20, Web3Client } = require("@opweb3/ethcontracts");
const Web3 = require("web3");

const token = new ERC20('0x8f3cf7ad23cd3cadbd9735aff958023239c6a063');

async function init() {
    const provider = new Web3.providers.HttpProvider('https://polygon-rpc.com');
    await token.init(
        new Web3Client(provider)
    );


    // const balance = await token.getBalance("0xd5D3F35Bdd08950CCFE0DeAb638F8B5498297076");
    // console.log("balance", balance);

    const totalSupply = await token.getTotalSupply();
    console.log("totalSupply", totalSupply);
}

init();
