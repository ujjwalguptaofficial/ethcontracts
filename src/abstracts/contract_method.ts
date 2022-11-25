import { ITransactionRequestConfig, ILogger } from "../interfaces";
import { TYPE_TRANSACTION_WRITE_RESULT } from "../types";

export abstract class BaseContractMethod {
    constructor(public logger: ILogger) {

    }
    abstract get address(): string;
    abstract read<T>(tx?: ITransactionRequestConfig,): Promise<T>;
    abstract write(tx: ITransactionRequestConfig): TYPE_TRANSACTION_WRITE_RESULT;
    abstract encodeABI(): any;
}