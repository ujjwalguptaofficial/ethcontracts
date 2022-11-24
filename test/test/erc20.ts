import { ERC20, Web3Client } from "@opweb3/ethcontracts"
import { expect } from "chai";
import { AbstractProvider, TransactionReceipt } from "web3-core";
import { IDeployedPayload } from "./interface"
import toWeb3Provider from "ethers-to-web3"


export function testERC20(payload: IDeployedPayload) {
    describe("erc20 methods", () => {
        let erc20: ERC20;

        it('setup', async () => {
            erc20 = new ERC20(payload.erc20Token1.address);
            await erc20.init(
                // new Web3Client(network.provider)

                new Web3Client(toWeb3Provider(payload.deployer))
            )
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