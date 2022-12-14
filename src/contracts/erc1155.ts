import { IERC1155, ITransactionRequestConfig } from "../interfaces";
import { BaseToken } from "./base_token";

export class ERC1155 extends BaseToken implements IERC1155 {
    constructor(tokenAddress: string, contractName?: string) {
        super(tokenAddress, contractName || "erc1155");
    }

    isInterfaceSupported(interfaceId: any) {
        return this.contract.method("supportsInterface", interfaceId).read<boolean>();
    }

    getTokenCount<T>(userAdddress: string, id) {
        return this.contract.method("balanceOf", userAdddress, id).read<T | any>();
    }

    getTokenCountForMany<T>(accounts: string[], ids: any[]) {
        return this.contract.method("balanceOfBatch", accounts, ids).read<T[] | any[]>();
    }

    isApprovedForAll(owner: string, operator: string) {
        return this.contract.method("isApprovedForAll", owner, operator).read<boolean>();
    }

    setApprovalForAll(operator: string, approved: boolean, config?: ITransactionRequestConfig) {
        const method = this.contract.method("setApprovalForAll", operator, approved);
        return this.writeTransaction(method, config);
    }

    safeTransferFrom(from: string, to: string, id: any, amount: any, data?: any, config?: ITransactionRequestConfig | undefined) {
        const method = this.contract.method(
            "safeTransferFrom", from, to, id, amount, data || '0x'
        );
        return this.writeTransaction(method, config);
    }

    safeBatchTransferFrom(from: string, to: string, ids: any[], amounts: any[], data?: any, config?: ITransactionRequestConfig | undefined) {
        const method = this.contract.method(
            "safeBatchTransferFrom", from, to, ids, amounts, data || '0x'
        );
        return this.writeTransaction(method, config);
    }

}