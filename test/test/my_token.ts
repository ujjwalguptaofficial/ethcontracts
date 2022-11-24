
import { expect } from "chai";
import { toUtf8Bytes } from "ethers/lib/utils";
import { ethers, upgrades } from "hardhat"
import { describe } from "mocha";
import { IDeployedPayload } from "./interface";
import { testERC20 } from "./erc20";
import { testWeb3Js } from "./web3js";
import { testEthers } from "./ethers";

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

        const deployedContract = await upgrades.deployProxy(
            contract, ["MyToken", "MT"], {
            initializer: 'initialize',
        }) as any;
        payload.erc20Token1 = deployedContract;

        await payload.erc20Token1.mint(payload.deployer.address, 900000000000);
        await payload.erc20Token1.mint(payload.signer2.address, 900000000000);
        await payload.erc20Token1.mint(payload.signer4.address, 900000000000);
    });

    // it('web3js', () => {
    //     testWeb3Js(payload);
    // })

    it('ethers', () => {
        testEthers(payload);
    })
})