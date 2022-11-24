import { testERC20 } from "./erc20";
import { IDeployedPayload } from "../interface";
import { Web3Client } from "@opweb3/ethcontracts";
import toWeb3Provider from "ethers-to-web3"

export function testWeb3Js(payload: IDeployedPayload) {
    describe('erc20', () => {
        testERC20(
            payload, new Web3Client(toWeb3Provider(payload.deployer))
        )
    })
}