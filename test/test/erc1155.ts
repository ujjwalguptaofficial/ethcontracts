import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BaseWeb3Client, ERC1155 } from "@ethcontracts/core"
import { assert, expect } from "chai";
import { ethers } from "hardhat";
import { TransactionReceipt } from "web3-core";
import { GameNFT, MyNFT } from "../typechain-types";
import { IDeployedPayload } from "./interface"
import { EthersClient } from "@ethcontracts/ethers";
import { Web3Client } from "@ethcontracts/web3";
import toWeb3Provider from "ethers-to-web3"

export function testERC1155(payload: IDeployedPayload) {
    describe('web3js', () => {

        let nftToken: GameNFT;
        it('deploy erc1155 token', async () => {
            const contract = await ethers.getContractFactory('GameNFT');

            const deployedContract = await contract.deploy();
            nftToken = deployedContract;


            await nftToken.mint(payload.deployer.address, 1, 100, "0x");
            await nftToken.mint(payload.deployer.address, 2, 100, "0x");
            await nftToken.mint(payload.signer2.address, 3, 100, "0x");
            await nftToken.mint(payload.signer4.address, 4, 200, "0x");
        });

        testERC1155API(
            payload, () => nftToken, (user: SignerWithAddress) => {
                return new Web3Client(toWeb3Provider(user));
            }
        )
    })

    describe('ethers', () => {

        let nftToken: GameNFT;
        it('deploy erc721 token', async () => {
            const contract = await ethers.getContractFactory('GameNFT');

            const deployedContract = await contract.deploy();
            nftToken = deployedContract;


            await nftToken.mint(payload.deployer.address, 1, 100, "0x");
            await nftToken.mint(payload.deployer.address, 2, 100, "0x");
            await nftToken.mint(payload.signer2.address, 3, 100, "0x");
            await nftToken.mint(payload.signer4.address, 4, 200, "0x");

        });

        testERC1155API(
            payload, () => nftToken, (user: SignerWithAddress) => {
                return new EthersClient(user as any);
            }
        )
    })
}

function testERC1155API(payload: IDeployedPayload, getNftToken: () => GameNFT, getWeb3Client: (user: SignerWithAddress) => BaseWeb3Client) {
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

    it('getTokenCount', async () => {
        const userBalance = await erc1155.getTokenCount(payload.deployer.address, 1);
        expect(Number(userBalance)).equal(100)
    })

    it('getTokenCountForMany', async () => {
        const balance = await erc1155.getTokenCountForMany([
            payload.deployer.address,
            payload.signer2.address
        ], [1, 1]);
        expect(balance.map(q => q.toString())).eql(['100', '0']);
    })

    it('isApprovedForAll', async () => {
        const isApprovedForAll = await erc1155.isApprovedForAll(payload.deployer.address, payload.signer4.address);
        expect(isApprovedForAll).equal(false);
    })

    it('transferFrom to signer2', async () => {
        const tokenId = 1;
        const to = payload.signer2.address;
        const from = payload.deployer.address;
        const beforeBalanceOfFrom = await erc1155.getTokenCount(from, tokenId);
        const beforeBalanceOfTo = await erc1155.getTokenCount(to, tokenId);
        const amount = 5;

        const [getTransactionHash, getTxReceipt] = erc1155.safeTransferFrom(from, to, tokenId, amount);
        const txhash = await getTransactionHash();
        const receipt = await getTxReceipt<TransactionReceipt>();
        expect(txhash).to.be.string;

        // check receipt
        expect(receipt.transactionHash).equal(txhash);
        expect(receipt.blockHash).to.be.string;
        expect(receipt.to.toLowerCase()).equal(nftToken.address.toLowerCase());

        // check for amount transfer 

        const afterBalanceOfFrom = await erc1155.getTokenCount(from, tokenId);
        const aftereBalanceOfTo = await erc1155.getTokenCount(to, tokenId);

        expect(afterBalanceOfFrom.toString()).equal(
            (Number(beforeBalanceOfFrom) - amount).toString()
        )
        expect(aftereBalanceOfTo.toString()).eql(
            (Number(beforeBalanceOfTo) + amount).toString()
        )
    })


    it('setApprovalForAll', async () => {
        const spender = payload.signer4.address;
        const owner = payload.signer2.address;
        const tokenId = 2;

        const nft = new ERC1155(nftToken.address);
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

    it('safeBatchTransferFrom', async () => {
        const tokenId1 = 1;
        const tokenId2 = 2;

        const to = payload.signer2.address;
        const from = payload.deployer.address;
        const beforeBalanceOfFromForTokenId1 = await erc1155.getTokenCount(from, tokenId1);
        const beforeBalanceOfFromForTokenId2 = await erc1155.getTokenCount(from, tokenId2);

        const beforeBalanceOfToForTokenId1 = await erc1155.getTokenCount(to, tokenId1);
        const beforeBalanceOfToForTokenId2 = await erc1155.getTokenCount(to, tokenId2);

        const amount = 5;

        const token = new ERC1155(nftToken.address);
        await token.init(
            getWeb3Client(payload.deployer)
        )



        const [getTxReceipt] = token.safeBatchTransferFrom(from, to, [tokenId1, tokenId2], [amount, amount]);
        await getTxReceipt();

        // check for amount transfer 

        const afterBalanceOfFromForTokenId1 = await erc1155.getTokenCount(from, tokenId1);
        const afterBalanceOfFromForTokenId2 = await erc1155.getTokenCount(from, tokenId2);

        const aftereBalanceOfToForTokenId1 = await erc1155.getTokenCount(to, tokenId1);
        const aftereBalanceOfToForTokenId2 = await erc1155.getTokenCount(to, tokenId2);

        expect(afterBalanceOfFromForTokenId1.toString()).eql(
            (Number(beforeBalanceOfFromForTokenId1) - amount).toString()
        )
        expect(afterBalanceOfFromForTokenId2.toString()).eql(
            (Number(beforeBalanceOfFromForTokenId2) - amount).toString()
        )

        expect(aftereBalanceOfToForTokenId1.toString()).eql(
            (Number(beforeBalanceOfToForTokenId1) + amount).toString()
        )
        expect(aftereBalanceOfToForTokenId2.toString()).eql(
            (Number(beforeBalanceOfToForTokenId2) + amount).toString()
        )
    })
}