import { testERC20 } from "./erc20";
import { IDeployedPayload } from "../interface";
import { EtherWeb3Client } from "@opweb3/ethcontracts";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

export function testEthers(payload: IDeployedPayload) {
    describe('erc20', () => {
        testERC20(
            payload, (user: SignerWithAddress) => {
                return new EtherWeb3Client(user as any);
            }
        )
    })
}