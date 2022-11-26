import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BaseWeb3Client, ERC20 } from "@opweb3/ethcontracts"
import { assert, expect } from "chai";
import { IDeployedPayload } from "./interface"


export function testClient(payload: IDeployedPayload, getWeb3Client: (user: SignerWithAddress) => BaseWeb3Client) {
    describe("read only tx", () => {
        let erc20: ERC20;

        it('setup', async () => {
            erc20 = new ERC20(payload.erc20Token1.address);
            await erc20.init(
                // new Web3Client(network.provider)

                getWeb3Client(payload.deployer)
            )
        })

        it('name', async () => {
            const name = await erc20.getName();
            expect(name).equal('MyToken');
        })
    })

}