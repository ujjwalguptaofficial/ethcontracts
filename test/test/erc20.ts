import { ERC20, Web3Client } from "@opweb3/ethcontracts"
import { expect } from "chai";
import { network, ethers } from "hardhat";
import Web3 from "web3";
import { IDeployedPayload } from "./interface"

export function testERC20(payload: IDeployedPayload) {
    describe("erc20 methods", () => {
        let erc20: ERC20;

        it('setup', async () => {
            erc20 = new ERC20(payload.erc20Token1.address);
            await erc20.init(
                new Web3Client(network.provider)
            )
        })

        it('user balance', async () => {
            const userBalance = await erc20.getBalance(payload.deployer.address);
            expect(userBalance).equal('900000000000');
        })

        it('total supply', async () => {
            const userBalance = await erc20.getTotalSupply();
            expect(userBalance).equal('2700000000000');
        })
    })
}