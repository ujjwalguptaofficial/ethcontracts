import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BaseWeb3Client, ERC1155 } from "@ethcontracts/core"
import { assert, expect } from "chai";
import { ethers } from "hardhat";
import { TransactionReceipt } from "web3-core";
import { GameNFT, MyNFT } from "../typechain-types";
import { IDeployedPayload } from "./interface"


export function testERC1155(payload: IDeployedPayload, getNftToken: () => GameNFT, getWeb3Client: (user: SignerWithAddress) => BaseWeb3Client) {
    let erc1155: ERC1155;
    let nftToken: GameNFT;

    it('setup', async () => {
        nftToken = getNftToken();
        erc1155 = new ERC1155(nftToken.address);
        await erc1155.init(
            // new Web3Client(network.provider)

            getWeb3Client(payload.deployer)
        )
    })

    it('getBalance', async () => {
        const userBalance = await erc1155.getBalance(payload.deployer.address, 1);
        expect(Number(userBalance)).equal(100)
    })

    it('getBalanceInBatch', async () => {
        const balance = await erc1155.getBalanceInBatch([
            payload.deployer.address,
            payload.signer2.address
        ], [1, 1]);
        expect(balance).eql(['100', '0']);
    })

    return;

    it('getTokenURI', async () => {
        const owner = await erc1155.getTokenURI(1);
        expect(owner).equal("https://mynft.com/1");
    })

    it('isApprovedForAll', async () => {
        const isApprovedForAll = await erc1155.isApprovedForAll(payload.deployer.address, payload.signer4.address);
        expect(isApprovedForAll).equal(false);
    })

    it('transferFrom to signer2', async () => {
        const tokenId = 1;
        const to = payload.signer2.address;
        const from = payload.deployer.address;
        const beforeBalanceOfFrom = await erc1155.getTokenCount(from);
        const beforeBalanceOfTo = await erc1155.getTokenCount(to);

        const [getTransactionHash, getTxReceipt] = erc1155.transferFrom(from, to, tokenId);
        const txhash = await getTransactionHash();
        const receipt = await getTxReceipt<TransactionReceipt>();
        expect(txhash).to.be.string;

        // check receipt
        expect(receipt.transactionHash).equal(txhash);
        expect(receipt.blockHash).to.be.string;
        expect(receipt.to.toLowerCase()).equal(nftToken.address.toLowerCase());

        // check for amount transfer 

        const afterBalanceOfFrom = await erc1155.getBalance(from);
        const aftereBalanceOfTo = await erc1155.getBalance(to);

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
        const approvedAccountBefore = await erc1155.getApprovedAccount(tokenId);
        expect(approvedAccountBefore).equal(ethers.constants.Zero);
        const [getTxReceipt] = erc1155.approve(spender, tokenId);
        await getTxReceipt();
        const afterAllowance = await erc1155.getApprovedAccount(tokenId);
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

        const [getTxReceipt] = nft.setApprovalForAll(spender, true);
        await getTxReceipt();
        const afterAllowance = await nft.isApprovedForAll(owner, spender);
        expect(afterAllowance).equal(true);
    })

    it('safeTransferFrom', async () => {
        const to = payload.signer3.address;
        const from = payload.signer2.address;
        const tokenId = 2;

        const beforeBalanceOfFrom = await erc1155.getBalance(from);
        const beforeBalanceOfTo = await erc1155.getBalance(to);

        const token = new ERC721(nftToken.address);
        await token.init(
            getWeb3Client(payload.signer4)
        )

        const oldOwner = await token.getOwner(tokenId);
        expect(oldOwner).equal(from);

        const [getTxReceipt] = token.safeTransferFrom(from, to, tokenId);
        await getTxReceipt();

        // check for amount transfer 

        const afterBalanceOfFrom = await erc1155.getBalance(from);
        const aftereBalanceOfTo = await erc1155.getBalance(to);

        expect(afterBalanceOfFrom.toString()).eql(
            (Number(beforeBalanceOfFrom) - 1).toString()
        )
        expect(aftereBalanceOfTo.toString()).eql(
            (Number(beforeBalanceOfTo) + 1).toString()
        )

        // check for new owner

        const newOwner = await token.getOwner(tokenId);
        expect(newOwner).equal(to);
    })
}