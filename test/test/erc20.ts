import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BaseWeb3Client, ERC20 } from "@opweb3/ethcontracts"
import { expect } from "chai";
import { TransactionReceipt } from "web3-core";
import { IDeployedPayload } from "./interface"


export function testERC20(payload: IDeployedPayload, getWeb3Client: (user: SignerWithAddress) => BaseWeb3Client) {
    describe("erc20", () => {
        let erc20: ERC20;

        it('setup', async () => {
            erc20 = new ERC20(payload.erc20Token1.address);
            await erc20.init(
                // new Web3Client(network.provider)

                getWeb3Client(payload.deployer)
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

        it('approve', async () => {
            const spender = payload.signer4.address;
            const owner = payload.deployer.address;
            const beforeAllowance = await erc20.getAllowance(owner, spender);
            expect(beforeAllowance).equal('0');
            const amount = 1000000;
            const [getTxReceipt] = await erc20.approve(spender, amount);
            await getTxReceipt();
            const afterAllowance = await erc20.getAllowance(owner, spender);
            expect(afterAllowance).equal(amount.toString());
        })

        it('transferFrom', async () => {
            const to = payload.signer3.address;
            const from = payload.deployer.address;
            const beforeBalanceOfFrom = await erc20.getBalance(from);
            const beforeBalanceOfTo = await erc20.getBalance(to);

            const token = new ERC20(payload.erc20Token1.address);
            await token.init(
                getWeb3Client(payload.signer4)
            )

            const amount = 10000;
            const [getTxReceipt] = await token.transferFrom(payload.deployer.address, to, amount);
            await getTxReceipt();

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