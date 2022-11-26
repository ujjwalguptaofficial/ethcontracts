import { IERC721, ITransactionRequestConfig } from "../interfaces";
import { BaseToken } from "./base_token";

export class ERC721 extends BaseToken implements IERC721 {

    constructor(tokenAddress: string, contractName?: string) {
        super(tokenAddress, contractName || 'erc721');
    }

    getTokenCount<T>(userAdddress: string) {
        return this.getBalance(userAdddress);
    }

    isInterfaceSupported(interfaceId: any) {
        return this.contract.method("supportsInterface", interfaceId).read<boolean>();
    }

    getOwner(tokenId: any) {
        return this.contract.method("ownerOf", tokenId).read<string>();
    }

    getTokenURI(tokenId: any) {
        return this.contract.method("tokenURI", tokenId).read<string>();
    }

    getApprovedAccount(tokenId: any) {
        return this.contract.method("getApproved", tokenId).read<string>();
    }

    isApprovedForAll(owner: string, operator: string) {
        return this.contract.method("isApprovedForAll", owner, operator).read<boolean>();
    }

    approve(to: string, tokenId: any, config?: ITransactionRequestConfig) {
        const method = this.contract.method("approve", to, tokenId);
        return this.processWriteTransaction(method, config);
    }

    setApprovalForAll(operator: string, approved: boolean, config?: ITransactionRequestConfig | undefined) {
        const method = this.contract.method("setApprovalForAll", operator, approved);
        return this.processWriteTransaction(method, config);
    }

    transferFrom(from: string, to: string, tokenId: any, config?: ITransactionRequestConfig | undefined) {
        const method = this.contract.method("transferFrom", from, to, tokenId);
        return this.processWriteTransaction(method, config);
    }

    safeTransferFrom(from: string, to: string, tokenId: any, config?: ITransactionRequestConfig) {
        const methodName = "safeTransferFrom(address,address,uint256)";
        const method = this.contract.method(methodName, from, to, tokenId);
        return this.processWriteTransaction(method, config);
    }

    safeTransferFromWithData(from: string, to: string, tokenId: any, data: any, config?: ITransactionRequestConfig) {
        const methodName = "safeTransferFrom(address,address,uint256,bytes)";
        const method = this.contract.method(methodName, from, to, tokenId, data);
        return this.processWriteTransaction(method, config);
    }


}