import { TYPE_TRANSACTION_WRITE_RESULT } from "../types";
import { IERC1155 } from "./erc1155";
import { ITransactionRequestConfig } from "./transaction_request_config";

export interface IERC1155Burnable extends IERC1155 {
    burn(account: string, tokenId, value, txConfig?: ITransactionRequestConfig): TYPE_TRANSACTION_WRITE_RESULT;
    burnBatch(account: string, tokenIds: any[], values: [], txConfig?: ITransactionRequestConfig): TYPE_TRANSACTION_WRITE_RESULT;
}