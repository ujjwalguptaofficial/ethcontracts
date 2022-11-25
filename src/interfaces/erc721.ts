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

    approve(to: string, tokenId, config?: ITransactionRequestConfig)
    setApprovalForAll(operator: string, approved: boolean, config?: ITransactionRequestConfig)
    transferFrom(from: string, to: string, tokenId, config?: ITransactionRequestConfig);
    safeTransferFrom(from: string, to: string, tokenId, config?: ITransactionRequestConfig);
    safeTransferFromWithData(from: string, to: string, tokenId, data, config?: ITransactionRequestConfig);
}