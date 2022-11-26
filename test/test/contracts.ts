
import { ethers, upgrades } from "hardhat"
import { describe } from "mocha";
import { IDeployedPayload } from "./interface";
import { testERC20 } from "./erc20";
import { EthersClient, Web3Client } from "@opweb3/ethcontracts";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import toWeb3Provider from "ethers-to-web3"
import { testERC721 } from "./erc721";
import { MyNFT } from "../typechain-types";
import { testClient } from "./client";


describe("contracts", () => {

    const payload = {


    } as IDeployedPayload;

    before(async () => {
        const [signer1, signer2, signer3, signer4] = await ethers.getSigners();
        payload.deployer = signer1;
        payload.signer2 = signer2;
        payload.signer3 = signer3;
        payload.signer4 = signer4;
    })

    it('deploy erc20 token', async () => {
        const contract = await ethers.getContractFactory('MyToken');

        const deployedContract = await contract.deploy("MyToken", "MT");
        payload.erc20Token1 = deployedContract;

        await payload.erc20Token1.mint(payload.deployer.address, 900000000000);
        await payload.erc20Token1.mint(payload.signer2.address, 900000000000);
        await payload.erc20Token1.mint(payload.signer4.address, 900000000000);
    });

    describe("client", () => {
        describe('web3js', () => {
            testClient(
                payload, (user: SignerWithAddress) => {
                    return new Web3Client(toWeb3Provider(user.provider));
                }
            )
        })

        describe('ethers', () => {
            testClient(
                payload, (user: SignerWithAddress) => {
                    return new EthersClient(user.provider as any);
                }
            )
        })
    })


    describe("erc20", () => {
        describe('web3js', () => {
            testERC20(
                payload, (user: SignerWithAddress) => {
                    return new Web3Client(toWeb3Provider(user));
                }
            )
        })

        describe('ethers', () => {
            testERC20(
                payload, (user: SignerWithAddress) => {
                    return new EthersClient(user as any);
                }
            )
        })
    })

    describe("erc721", () => {
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

            testERC721(
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
                await nftToken.mint(payload.signer2.address, 2);
                await nftToken.mint(payload.signer4.address, 3);

            });

            testERC721(
                payload, () => nftToken, (user: SignerWithAddress) => {
                    return new EthersClient(user as any);
                }
            )
        })
    })
})