import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { MyNFT } from "../typechain-types/contracts/my_nft.sol";
import { MyToken } from "../typechain-types/contracts/my_token.sol";

export interface IDeployedPayload {
    deployer: SignerWithAddress;
    signer2: SignerWithAddress;
    signer3: SignerWithAddress;
    signer4: SignerWithAddress;
    erc20Token1: MyToken,
    erc20Token2: MyToken,
    nftToken1: MyNFT
}