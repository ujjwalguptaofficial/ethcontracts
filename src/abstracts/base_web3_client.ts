import { BaseContract } from "../abstracts";
import { ILogger, ITransactionRequestConfig } from "../interfaces";
import { TYPE_TRANSACTION_WRITE_RESULT } from "../types";
export abstract class BaseWeb3Client {
    logger: ILogger;

    abstract init(): Promise<any>;
    abstract getContract(address: string, abi: any): BaseContract;
    abstract get walletAddress(): string;
    abstract getBalance<T>(walleAddress: string): Promise<T>;

    abstract sendTransaction(config: ITransactionRequestConfig): TYPE_TRANSACTION_WRITE_RESULT;

    abstract name: string;
}
