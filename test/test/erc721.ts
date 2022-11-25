import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BaseWeb3Client, ERC721 } from "@opweb3/ethcontracts"
import { assert, expect } from "chai";
import { TransactionReceipt } from "web3-core";
import { IDeployedPayload } from "./interface"


export function testERC721(payload: IDeployedPayload, getWeb3Client: (user: SignerWithAddress) => BaseWeb3Client) {
    let erc721: ERC721;

    it('setup', async () => {
        erc721 = new ERC721(payload.erc20Token1.address);
        await erc721.init(
            // new Web3Client(network.provider)

            getWeb3Client(payload.deployer)
        )
    })

    it('name', async () => {
        const name = await erc721.getName();
        expect(name).equal('MyToken');
    })

    it('symbol', async () => {
        const symbol = await erc721.getSymbol();
        expect(symbol).equal('MT');
    })

    it('user balance', async () => {
        const userBalance = await erc721.getBalance(payload.deployer.address);
        expect(Number(userBalance)).greaterThan(0)
    })

    // it('transfer to signer2', async () => {
    //     const amount = 1000;
    //     const to = payload.signer2.address;
    //     const from = payload.deployer.address;
    //     const beforeBalanceOfFrom = await erc721.getBalance(from);
    //     const beforeBalanceOfTo = await erc721.getBalance(to);

    //     const [getTransactionHash, getTxReceipt] = await erc721.transfer(to, amount);
    //     const txhash = await getTransactionHash();
    //     const receipt = await getTxReceipt<TransactionReceipt>();
    //     expect(txhash).to.be.string;

    //     // check receipt
    //     expect(receipt.transactionHash).equal(txhash);
    //     expect(receipt.blockHash).to.be.string;
    //     expect(receipt.to.toLowerCase()).equal(payload.erc20Token1.address.toLowerCase());

    //     // check for amount transfer 

    //     const afterBalanceOfFrom = await erc721.getBalance(from);
    //     const aftereBalanceOfTo = await erc721.getBalance(to);

    //     expect(afterBalanceOfFrom.toString()).equal(
    //         (Number(beforeBalanceOfFrom) - amount).toString()
    //     )
    //     expect(aftereBalanceOfTo.toString()).eql(
    //         (Number(beforeBalanceOfTo) + amount).toString()
    //     )
    // })

    // it('approve', async () => {
    //     const spender = payload.signer4.address;
    //     const owner = payload.deployer.address;
    //     const beforeAllowance = await erc721.getAllowance(owner, spender);
    //     const amount = 1000000;
    //     const [getTxReceipt] = await erc721.approve(spender, amount);
    //     await getTxReceipt();
    //     const afterAllowance = await erc721.getAllowance(owner, spender);
    //     expect(afterAllowance).equal(amount.toString());
    // })

    // it('transferFrom', async () => {
    //     const to = payload.signer3.address;
    //     const from = payload.deployer.address;
    //     const beforeBalanceOfFrom = await erc721.getBalance(from);
    //     const beforeBalanceOfTo = await erc721.getBalance(to);

    //     const token = new ERC20(payload.erc20Token1.address);
    //     await token.init(
    //         getWeb3Client(payload.signer4)
    //     )

    //     const amount = 10000;
    //     const [getTxReceipt] = await token.transferFrom(payload.deployer.address, to, amount);
    //     await getTxReceipt();

    //     // check for amount transfer 

    //     const afterBalanceOfFrom = await erc721.getBalance(from);
    //     const aftereBalanceOfTo = await erc721.getBalance(to);

    //     expect(afterBalanceOfFrom.toString()).eql(
    //         (Number(beforeBalanceOfFrom) - amount).toString()
    //     )
    //     expect(aftereBalanceOfTo.toString()).eql(
    //         (Number(beforeBalanceOfTo) + amount).toString()
    //     )
    // })

    // it('increaseAllowance', async () => {
    //     const spender = payload.signer4.address;
    //     const owner = payload.deployer.address;
    //     const beforeAllowance = await erc721.getAllowance(owner, spender);
    //     const amount = 1000000;
    //     const [getTxReceipt] = await erc721.increaseAllowance(spender, amount);
    //     await getTxReceipt();
    //     const afterAllowance = await erc721.getAllowance(owner, spender);
    //     expect(afterAllowance).equal(
    //         (Number(beforeAllowance) + amount).toString()
    //     );
    // })

    // it('decreaseAllowance', async () => {
    //     const spender = payload.signer4.address;
    //     const owner = payload.deployer.address;
    //     const beforeAllowance = await erc721.getAllowance(owner, spender);
    //     const amount = 1000000;
    //     const [getTxReceipt] = await erc721.decreaseAllowance(spender, amount);
    //     await getTxReceipt();
    //     const afterAllowance = await erc721.getAllowance(owner, spender);
    //     expect(afterAllowance).equal(
    //         (Number(beforeAllowance) - amount).toString()
    //     );
    // })
}