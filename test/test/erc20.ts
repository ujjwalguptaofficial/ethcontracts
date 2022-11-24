import { BaseWeb3Client, ERC20 } from "@opweb3/ethcontracts"
import { expect } from "chai";
import { TransactionReceipt } from "web3-core";
import { IDeployedPayload } from "./interface"


export function testERC20(payload: IDeployedPayload, web3Client: BaseWeb3Client) {
    describe("erc20", () => {
        let erc20: ERC20;

        it('setup', async () => {
            erc20 = new ERC20(payload.erc20Token1.address);
            await erc20.init(
                // new Web3Client(network.provider)

                web3Client
            )
        })

        it('name', async () => {
            const name = await erc20.getName();
            expect(name).equal('MyToken');
        })

        it('decimals', async () => {
            const decimals = await erc20.getDecimals();
            expect(decimals).equal('18');
        })

        it('symbol', async () => {
            const symbol = await erc20.getSymbol();
            expect(symbol).equal('MT');
        })

        it('user balance', async () => {
            const userBalance = await erc20.getBalance(payload.deployer.address);
            expect(userBalance).equal('900000000000');
        })

        it('total supply', async () => {
            const userBalance = await erc20.getTotalSupply();
            expect(userBalance).equal('2700000000000');
        })

        it('transfer to signer2', async () => {
            const amount = 1000;
            const to = payload.signer2.address;
            const from = payload.deployer.address;
            const beforeBalanceOfFrom = await erc20.getBalance(from);
            const beforeBalanceOfTo = await erc20.getBalance(to);

            const [getTransactionHash, getTxReceipt] = await erc20.transfer(to, amount);
            const txhash = await getTransactionHash();
            const receipt = await getTxReceipt<TransactionReceipt>();
            expect(txhash).to.be.string;

            // check receipt
            expect(receipt.transactionHash).equal(txhash);
            expect(receipt.blockHash).to.be.string;
            expect(receipt.to.toLowerCase()).equal(payload.erc20Token1.address.toLowerCase());

            // check for amount transfer 

            const afterBalanceOfFrom = await erc20.getBalance(from);
            const aftereBalanceOfTo = await erc20.getBalance(to);

            expect(afterBalanceOfFrom).eql(
                (Number(beforeBalanceOfFrom) - amount).toString()
            )
            expect(aftereBalanceOfTo).eql(
                (Number(beforeBalanceOfTo) + amount).toString()
            )
        })
    })
}