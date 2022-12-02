import { TYPE_TRANSACTION_WRITE_RESULT } from "../types";
import { IERC721 } from "./erc721";
import { ITransactionRequestConfig } from "./transaction_request_config";

export interface IERC721Burnable extends IERC721 {
    burn(amount, txConfig?: ITransactionRequestConfig): TYPE_TRANSACTION_WRITE_RESULT;
}