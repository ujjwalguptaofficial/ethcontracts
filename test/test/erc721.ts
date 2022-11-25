import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BaseWeb3Client, ERC721 } from "@opweb3/ethcontracts"
import { assert, expect } from "chai";
import { ethers } from "hardhat";
import { TransactionReceipt } from "web3-core";
import { MyNFT } from "../typechain-types";
import { IDeployedPayload } from "./interface"


export function testERC721(payload: IDeployedPayload, getNftToken: () => MyNFT, getWeb3Client: (user: SignerWithAddress) => BaseWeb3Client) {
    let erc721: ERC721;
    let nftToken: MyNFT;
    it('setup', async () => {
        nftToken = getNftToken();
        erc721 = new ERC721(nftToken.address);
        await erc721.init(
            // new Web3Client(network.provider)

            getWeb3Client(payload.deployer)
        )
    })

    it('name', async () => {
        const name = await erc721.getName();
        expect(name).equal('MyNFTToken');
    })

    it('symbol', async () => {
        const symbol = await erc721.getSymbol();
        expect(symbol).equal('MNFT');
    })

    it('getTokenCount', async () => {
        const userBalance = await erc721.getTokenCount(payload.deployer.address);
        expect(Number(userBalance)).greaterThan(0)
    })

    it('getOwner', async () => {
        const owner = await erc721.getOwner(1);
        expect(owner).equal(payload.deployer.address);
    })

    it('getTokenURI', async () => {
        const owner = await erc721.getTokenURI(1);
        expect(owner).equal("https://mynft.com/1");
    })

    it('isApprovedForAll', async () => {
        const isApprovedForAll = await erc721.isApprovedForAll(payload.deployer.address, payload.signer4.address);
        expect(isApprovedForAll).equal(false);
    })

    it('transferFrom to signer2', async () => {
        const tokenId = 1;
        const to = payload.signer2.address;
        const from = payload.deployer.address;
        const beforeBalanceOfFrom = await erc721.getTokenCount(from);
        const beforeBalanceOfTo = await erc721.getTokenCount(to);

        const [getTransactionHash, getTxReceipt] = await erc721.transferFrom(from, to, tokenId);
        const txhash = await getTransactionHash();
        const receipt = await getTxReceipt<TransactionReceipt>();
        expect(txhash).to.be.string;

        // check receipt
        expect(receipt.transactionHash).equal(txhash);
        expect(receipt.blockHash).to.be.string;
        expect(receipt.to.toLowerCase()).equal(nftToken.address.toLowerCase());

        // check for amount transfer 

        const afterBalanceOfFrom = await erc721.getBalance(from);
        const aftereBalanceOfTo = await erc721.getBalance(to);

        expect(afterBalanceOfFrom.toString()).equal(
            (Number(beforeBalanceOfFrom) - tokenId).toString()
        )
        expect(aftereBalanceOfTo.toString()).eql(
            (Number(beforeBalanceOfTo) + tokenId).toString()
        )
    })


    it('approve', async () => {
        const spender = payload.signer4.address;
        const owner = payload.deployer.address;
        const tokenId = 11;
        const approvedAccountBefore = await erc721.getApprovedAccount(tokenId);
        expect(approvedAccountBefore).equal(ethers.constants.Zero);
        const [getTxReceipt] = await erc721.approve(spender, tokenId);
        await getTxReceipt();
        const afterAllowance = await erc721.getApprovedAccount(tokenId);
        expect(afterAllowance).equal(spender);
    })

    it('setApprovalForAll', async () => {
        const spender = payload.signer4.address;
        const owner = payload.signer2.address;
        const tokenId = 2;

        const nft = new ERC721(nftToken.address);
        await nft.init(
            getWeb3Client(payload.signer2)
        )

        const approvedAccountBefore = await nft.isApprovedForAll(owner, spender);
        expect(approvedAccountBefore).equal(false);

        const [getTxReceipt] = await nft.setApprovalForAll(spender, true);
        await getTxReceipt();
        const afterAllowance = await nft.isApprovedForAll(owner, spender);
        expect(afterAllowance).equal(true);
    })

    return;

    it('transferFrom', async () => {
        const to = payload.signer3.address;
        const from = payload.deployer.address;
        const beforeBalanceOfFrom = await erc721.getBalance(from);
        const beforeBalanceOfTo = await erc721.getBalance(to);

        const token = new ERC20(payload.erc20Token1.address);
        await token.init(
            getWeb3Client(payload.signer4)
        )

        const amount = 10000;
        const [getTxReceipt] = await token.transferFrom(payload.deployer.address, to, amount);
        await getTxReceipt();

        // check for amount transfer 

        const afterBalanceOfFrom = await erc721.getBalance(from);
        const aftereBalanceOfTo = await erc721.getBalance(to);

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
        const beforeAllowance = await erc721.getAllowance(owner, spender);
        const amount = 1000000;
        const [getTxReceipt] = await erc721.increaseAllowance(spender, amount);
        await getTxReceipt();
        const afterAllowance = await erc721.getAllowance(owner, spender);
        expect(afterAllowance).equal(
            (Number(beforeAllowance) + amount).toString()
        );
    })

    it('decreaseAllowance', async () => {
        const spender = payload.signer4.address;
        const owner = payload.deployer.address;
        const beforeAllowance = await erc721.getAllowance(owner, spender);
        const amount = 1000000;
        const [getTxReceipt] = await erc721.decreaseAllowance(spender, amount);
        await getTxReceipt();
        const afterAllowance = await erc721.getAllowance(owner, spender);
        expect(afterAllowance).equal(
            (Number(beforeAllowance) - amount).toString()
        );
    })
}