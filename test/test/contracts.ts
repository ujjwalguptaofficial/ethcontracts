
import { ethers } from "hardhat"
import { describe } from "mocha";
import { IDeployedPayload } from "./interface";
import { testERC20 } from "./erc20";
import { testERC721 } from "./erc721";
import { testClient } from "./client";
import { testERC1155 } from "./erc1155";
import { testERC20Burnable } from "./erc20_burnable";


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

    describe("client", () => {
        testClient(payload);
    })


    describe("erc20", () => {
        testERC20(payload);
    })

    describe("erc20 burnable", () => {
        testERC20Burnable(payload);
    })

    describe("erc721", () => {
        testERC721(payload);
    })

    describe("erc1155", () => {
        testERC1155(payload);
    })
})