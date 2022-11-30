import { TYPE_TRANSACTION_WRITE_RESULT } from "../types";
import { IERC20 } from "./erc20";
import { ITransactionRequestConfig } from "./transaction_request_config";

export interface IERC20Burnable extends IERC20 {
    burn(amount, txConfig?: ITransactionRequestConfig): TYPE_TRANSACTION_WRITE_RESULT;

    burnFrom(account: string, amount, txConfig?: ITransactionRequestConfig): TYPE_TRANSACTION_WRITE_RESULT;
}