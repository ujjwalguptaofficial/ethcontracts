import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BaseWeb3Client, ERC20 } from "@ethcontracts/core"
import { assert, expect } from "chai";
import { IDeployedPayload } from "./interface"
import { MyToken } from "../typechain-types";
import { EthersClient } from "@ethcontracts/ethers";
import { Web3Client } from "@ethcontracts/web3";
import { ethers } from "hardhat";
import toWeb3Provider from "ethers-to-web3"


export function testClient(payload: IDeployedPayload) {
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

        testClientCase(
            payload, () => erc20Token, (user: SignerWithAddress) => {
                return new Web3Client(toWeb3Provider(user.provider));
            },
            (user: SignerWithAddress) => {
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

        testClientCase(
            payload, () => erc20Token, (user: SignerWithAddress) => {
                return new EthersClient(user.provider as any);
            },
            (user: SignerWithAddress) => {
                return new EthersClient(user as any);
            }
        )
    })
}
export function testClientCase(payload: IDeployedPayload, getToken: () => MyToken, getWeb3ReadClient: (user: SignerWithAddress) => BaseWeb3Client, getWeb3WriteClient: (user: SignerWithAddress) => BaseWeb3Client) {


    describe("read only tx", () => {
        let erc20: ERC20;
        let myToken: MyToken;
        before(async () => {
            myToken = getToken();
            erc20 = new ERC20(myToken.address);
            await erc20.init(
                // new Web3Client(network.provider)

                getWeb3ReadClient(payload.deployer)
            )
        })

        it('name', async () => {
            const name = await erc20.getName();
            expect(name).equal('MyToken');
        })
    })

    describe("fail write tx", () => {
        let erc20: ERC20;

        let myToken: MyToken;
        before(async () => {
            myToken = getToken();
            erc20 = new ERC20(myToken.address);
            await erc20.init(
                // new Web3Client(network.provider)

                getWeb3WriteClient(payload.deployer)
            )
        })

        it('transfer', async () => {
            // try {
            const [txHashPromise] = await erc20.transferFrom(payload.signer2.address, payload.signer4.address, "1234566666666666666666666666666");
            try {
                const txHash = await txHashPromise();
                throw "there should be error";
            } catch (error) {
                expect(error.message).contains("ERC20: insufficient allowance");
            }
            // } catch (error) {

            // }
        })
    })

}