import { TYPE_TRANSACTION_WRITE_RESULT } from "../types";
import { IERC165 } from "./erc165";
import { ITransactionRequestConfig } from "./transaction_request_config";

export interface IERC1155 extends IERC165 {
    getTokenCount(account: string, id);
    getTokenCountForMany(accounts: string[], ids: any[]);
    isApprovedForAll(account: string, operator: string): Promise<boolean>;

    setApprovalForAll(operator: string, approved: boolean, config?: ITransactionRequestConfig): TYPE_TRANSACTION_WRITE_RESULT;


    safeTransferFrom(from: string, to: string, id, amount, data, config?: ITransactionRequestConfig): TYPE_TRANSACTION_WRITE_RESULT;

    safeBatchTransferFrom(from: string, to: string, ids: any[], amounts: any[], data, config?: ITransactionRequestConfig): TYPE_TRANSACTION_WRITE_RESULT;
}