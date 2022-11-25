import { TYPE_TRANSACTION_WRITE_RESULT } from "../types";
import { ITransactionRequestConfig } from "./transaction_request_config";

export interface IERC721 {
    isInterfaceSupported(interfaceId);
    getName();
    getSymbol();
    getBalance(owner: string);
    getOwner(tokenId);
    getTokenURI(tokenId);
    getApprovedAccount(tokenId);
    isApprovedForAll(owner: string, operator: string);

    approve(to: string, tokenId, config?: ITransactionRequestConfig): TYPE_TRANSACTION_WRITE_RESULT;
    setApprovalForAll(operator: string, approved: boolean, config?: ITransactionRequestConfig): TYPE_TRANSACTION_WRITE_RESULT;
    transferFrom(from: string, to: string, tokenId, config?: ITransactionRequestConfig): TYPE_TRANSACTION_WRITE_RESULT;
    safeTransferFrom(from: string, to: string, tokenId, config?: ITransactionRequestConfig): TYPE_TRANSACTION_WRITE_RESULT;
    safeTransferFromWithData(from: string, to: string, tokenId, data, config?: ITransactionRequestConfig): TYPE_TRANSACTION_WRITE_RESULT;
}