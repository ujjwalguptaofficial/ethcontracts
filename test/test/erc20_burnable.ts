import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BaseWeb3Client, ERC20Burnable } from "@ethcontracts/core"
import { assert, expect } from "chai";
import { IDeployedPayload } from "./interface"
import { MyTokenBurnable } from "../typechain-types";
import { ethers } from "hardhat";
import { Web3Client } from "@ethcontracts/web3";
import toWeb3Provider from "ethers-to-web3"
import { EthersClient } from "@ethcontracts/ethers";

export function testERC20Burnable(payload: IDeployedPayload) {
    describe('web3js', () => {
        let erc20Token: MyTokenBurnable;
        it('deploy erc20 token', async () => {
            const contract = await ethers.getContractFactory('MyTokenBurnable');

            const deployedContract = await contract.deploy("MyToken", "MT");
            erc20Token = deployedContract;

            await erc20Token.mint(payload.deployer.address, 900000000000);
            await erc20Token.mint(payload.signer2.address, 900000000000);
            await erc20Token.mint(payload.signer4.address, 900000000000);
        });

        testERC20BurnableAPI(
            payload, () => erc20Token, (user: SignerWithAddress) => {
                return new Web3Client(toWeb3Provider(user));
            }
        )
    })

    describe('ethers', () => {
        let erc20Token: MyTokenBurnable;
        it('deploy erc20 token', async () => {
            const contract = await ethers.getContractFactory('MyTokenBurnable');

            const deployedContract = await contract.deploy("MyToken", "MT");
            erc20Token = deployedContract;

            await erc20Token.mint(payload.deployer.address, 900000000000);
            await erc20Token.mint(payload.signer2.address, 900000000000);
            await erc20Token.mint(payload.signer4.address, 900000000000);
        });

        testERC20BurnableAPI(
            payload, () => erc20Token, (user: SignerWithAddress) => {
                return new EthersClient(user as any);
            }
        )
    })

}


function testERC20BurnableAPI(payload: IDeployedPayload, getToken: () => MyTokenBurnable, getWeb3Client: (user: SignerWithAddress) => BaseWeb3Client) {
    let erc20: ERC20Burnable;
    let myToken: MyTokenBurnable;
    it('setup', async () => {
        myToken = getToken();
        erc20 = new ERC20Burnable(myToken.address);
        await erc20.init(
            // new Web3Client(network.provider)

            getWeb3Client(payload.deployer)
        )
    })

    it('burn', async () => {
        const owner = payload.deployer.address;
        const beforeBalance = await erc20.getBalance(owner);
        const amount = 1000000;
        const [getTxReceipt] = erc20.burn(amount);
        await getTxReceipt();
        const afterBalance = await erc20.getBalance(owner);
        expect(Number(afterBalance)).equal(
            Number(beforeBalance) - Number(amount)
        );
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

    it('burnFrom', async () => {
        const token = new ERC20Burnable(myToken.address);
        await token.init(
            getWeb3Client(payload.signer4)
        )

        const owner = payload.deployer.address;
        const beforeBalance = await token.getBalance(owner);
        const amount = 1000000;

        const [getTxReceipt] = token.burnFrom(owner, amount);
        await getTxReceipt();
        const afterBalance = await token.getBalance(owner);
        expect(Number(afterBalance)).equal(
            Number(beforeBalance) - Number(amount)
        );
    })
}