import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BaseWeb3Client, ERC721Burnable } from "@ethcontracts/core"
import { assert, expect } from "chai";
import { TransactionReceipt } from "web3-core";
import { MyNFT } from "../typechain-types";
import { IDeployedPayload } from "./interface"
import { EthersClient } from "@ethcontracts/ethers";
import { Web3Client } from "@ethcontracts/web3";
import { ethers } from "hardhat";
import toWeb3Provider from "ethers-to-web3"

export function testERC721Burnable(payload: IDeployedPayload) {
    describe('web3js', () => {

        let nftToken: MyNFT;
        it('deploy erc721 token', async () => {
            const contract = await ethers.getContractFactory('MyNFT');

            const deployedContract = await contract.deploy("MyNFTToken", "MNFT");
            nftToken = deployedContract;


            await nftToken.mint(payload.deployer.address, 1);
            await nftToken.mint(payload.deployer.address, 11);
            await nftToken.mint(payload.signer2.address, 2);
            await nftToken.mint(payload.signer4.address, 3);
        });

        testERC721API(
            payload, () => nftToken, (user: SignerWithAddress) => {
                return new Web3Client(toWeb3Provider(user));
            }
        )
    })

    describe('ethers', () => {

        let nftToken: MyNFT;
        it('deploy erc721 token', async () => {
            const contract = await ethers.getContractFactory('MyNFT');

            const deployedContract = await contract.deploy("MyNFTToken", "MNFT");
            nftToken = deployedContract;


            await nftToken.mint(payload.deployer.address, 1);
            await nftToken.mint(payload.deployer.address, 11);
            await nftToken.mint(payload.deployer.address, 111);
            await nftToken.mint(payload.signer2.address, 2);
            await nftToken.mint(payload.signer4.address, 3);

        });

        testERC721API(
            payload, () => nftToken, (user: SignerWithAddress) => {
                return new EthersClient(user as any);
            }
        )
    })
}

function testERC721API(payload: IDeployedPayload, getNftToken: () => MyNFT, getWeb3Client: (user: SignerWithAddress) => BaseWeb3Client) {
    let erc721: ERC721Burnable;
    let nftToken: MyNFT;
    it('setup', async () => {
        nftToken = getNftToken();
        erc721 = new ERC721Burnable(nftToken.address);
        await erc721.init(
            // new Web3Client(network.provider)

            getWeb3Client(payload.deployer)
        )
    })

    it('burn', async () => {
        const tokenId = 1;
        const from = payload.deployer.address;


        const beforeBalanceOfFrom = await erc721.getTokenCount(from);

        const [getTransactionHash, getTxReceipt] = erc721.burn(tokenId);
        const txhash = await getTransactionHash();
        const receipt = await getTxReceipt<TransactionReceipt>();
        expect(txhash).to.be.string;

        // check receipt
        expect(receipt.transactionHash).equal(txhash);
        expect(receipt.blockHash).to.be.string;
        expect(receipt.to.toLowerCase()).equal(nftToken.address.toLowerCase());

        // check for amount transfer 

        const afterBalanceOfFrom = await erc721.getBalance(from);

        expect(afterBalanceOfFrom.toString()).equal(
            (Number(beforeBalanceOfFrom) - 1).toString()
        )
    })
}