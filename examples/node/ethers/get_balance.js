const { ERC20, EthersClient } = require("@opweb3/ethcontracts");
const { providers } = require("ethers");

const token = new ERC20('0x8f3cf7ad23cd3cadbd9735aff958023239c6a063');

async function init() {
    const provider = new providers.JsonRpcProvider('https://polygon-rpc.com');

    const client = new EthersClient(provider);
    await token.init(
        client
    );

    const balance = await token.getBalance("0xd5D3F35Bdd08950CCFE0DeAb638F8B5498297076");
    console.log("balance", balance.toString());
}

init();
