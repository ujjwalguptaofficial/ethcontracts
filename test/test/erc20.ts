import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BaseWeb3Client, ERC20 } from "@ethcontracts/core"
import { assert, expect } from "chai";
import { TransactionReceipt } from "web3-core";
import { IDeployedPayload } from "./interface"
import { MyToken } from "../typechain-types";
import { EthersClient } from "@ethcontracts/ethers";
import { Web3Client } from "@ethcontracts/web3";
import { ethers } from "hardhat";
import toWeb3Provider from "ethers-to-web3"


export function testERC20(payload: IDeployedPayload) {
    describe('web3js', () => {
        let erc20Token: MyToken;
        it('deploy erc20 token', async () => {
            const contract = await ethers.getContractFactory('MyToken');

            const deployedContract = await contract.deploy("MyToken", "MT");
            erc20Token = deployedContract;

            await erc20Token.mint(payload.deployer.address, 900000000000);
            await erc20Token.mint(payload.signer2.address, 900000000000);
            await erc20Token.mint(payload.signer4.address, 900000000000);
        });

        testERC20API(
            payload, () => erc20Token, (user: SignerWithAddress) => {
                return new Web3Client(toWeb3Provider(user));
            }
        )
    })

    describe('ethers', () => {
        let erc20Token: MyToken;
        it('deploy erc20 token', async () => {
            const contract = await ethers.getContractFactory('MyToken');

            const deployedContract = await contract.deploy("MyToken", "MT");
            erc20Token = deployedContract;

            await erc20Token.mint(payload.deployer.address, 900000000000);
            await erc20Token.mint(payload.signer2.address, 900000000000);
            await erc20Token.mint(payload.signer4.address, 900000000000);
        });

        testERC20API(
            payload, () => erc20Token, (user: SignerWithAddress) => {
                return new EthersClient(user as any);
            }
        )
    })
}

function testERC20API(payload: IDeployedPayload, getToken: () => MyToken, getWeb3Client: (user: SignerWithAddress) => BaseWeb3Client) {
    let erc20: ERC20;
    let myToken: MyToken;
    it('setup', async () => {
        myToken = getToken();
        erc20 = new ERC20(myToken.address);
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
        assert.equal(decimals, 18);
    })

    it('symbol', async () => {
        const symbol = await erc20.getSymbol();
        expect(symbol).equal('MT');
    })

    it('user balance', async () => {
        const userBalance = await erc20.getBalance(payload.deployer.address);
        expect(Number(userBalance)).equal(900000000000);
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

        const [getTransactionHash, getTxReceipt] = erc20.transfer(to, amount);
        const txhash = await getTransactionHash();
        const receipt = await getTxReceipt<TransactionReceipt>();
        expect(txhash).to.be.string;

        // check receipt
        expect(receipt.transactionHash).equal(txhash);
        expect(receipt.blockHash).to.be.string;
        expect(receipt.to.toLowerCase()).equal(myToken.address.toLowerCase());

        // check for amount transfer 

        const afterBalanceOfFrom = await erc20.getBalance(from);
        const aftereBalanceOfTo = await erc20.getBalance(to);

        expect(afterBalanceOfFrom.toString()).equal(
            (Number(beforeBalanceOfFrom) - amount).toString()
        )
        expect(aftereBalanceOfTo.toString()).eql(
            (Number(beforeBalanceOfTo) + amount).toString()
        )
    })

    it('approve', async () => {
        const spender = payload.signer4.address;
        const owner = payload.deployer.address;
        const beforeAllowance = await erc20.getAllowance(owner, spender);
        const amount = 1000000;
        const [getTxReceipt] = erc20.approve(spender, amount);
        await getTxReceipt();
        const afterAllowance = await erc20.getAllowance(owner, spender);
        expect(afterAllowance).equal(amount.toString());
    })

    it('transferFrom', async () => {
        const to = payload.signer3.address;
        const from = payload.deployer.address;
        const beforeBalanceOfFrom = await erc20.getBalance(from);
        const beforeBalanceOfTo = await erc20.getBalance(to);

        const token = new ERC20(myToken.address);
        await token.init(
            getWeb3Client(payload.signer4)
        )

        const amount = 10000;
        const [getTxReceipt] = token.transferFrom(payload.deployer.address, to, amount);
        await getTxReceipt();

        // check for amount transfer 

        const afterBalanceOfFrom = await erc20.getBalance(from);
        const aftereBalanceOfTo = await erc20.getBalance(to);

        expect(afterBalanceOfFrom.toString()).eql(
            (Number(beforeBalanceOfFrom) - amount).toString()
        )
        expect(aftereBalanceOfTo.toString()).eql(
            (Number(beforeBalanceOfTo) + amount).toString()
        )
    })

    it('increaseAllowance', async () => {
        const spender = payload.signer4.address;
        const owner = payload.deployer.address;
        const beforeAllowance = await erc20.getAllowance(owner, spender);
        const amount = 1000000;
        const [getTxReceipt] = erc20.increaseAllowance(spender, amount);
        await getTxReceipt();
        const afterAllowance = await erc20.getAllowance(owner, spender);
        expect(afterAllowance).equal(
            (Number(beforeAllowance) + amount).toString()
        );
    })

    it('decreaseAllowance', async () => {
        const spender = payload.signer4.address;
        const owner = payload.deployer.address;
        const beforeAllowance = await erc20.getAllowance(owner, spender);
        const amount = 1000000;
        const [getTxReceipt] = erc20.decreaseAllowance(spender, amount);
        await getTxReceipt();
        const afterAllowance = await erc20.getAllowance(owner, spender);
        expect(afterAllowance).equal(
            (Number(beforeAllowance) - amount).toString()
        );
    })
}