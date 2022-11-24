import { TYPE_TRANSACTION_WRITE_RESULT } from "../types";
import { ITransactionRequestConfig } from "./transaction_request_config";

export interface IERC20 {
    getName(): Promise<string>;
    getDecimals(): Promise<string>;
    getSymbol(): Promise<string>;
    getBalance<T>(userAdddress: string): Promise<T>;
    getTotalSupply<T>(): Promise<T>;
    getAllowance<T>(owner: string, spender: string): Promise<T>;
    approve(spender: string, amount, tx?: ITransactionRequestConfig): Promise<TYPE_TRANSACTION_WRITE_RESULT>;
    transfer(to: string, amount, tx?: ITransactionRequestConfig): Promise<TYPE_TRANSACTION_WRITE_RESULT>;
    transferFrom(from: string, to: string, amount, tx?: ITransactionRequestConfig): Promise<TYPE_TRANSACTION_WRITE_RESULT>;

    increaseAllowance(spender: string, addedValue, tx?: ITransactionRequestConfig): Promise<TYPE_TRANSACTION_WRITE_RESULT>;

    decreaseAllowance(spender: string, subtractedValue, tx?: ITransactionRequestConfig): Promise<TYPE_TRANSACTION_WRITE_RESULT>
}