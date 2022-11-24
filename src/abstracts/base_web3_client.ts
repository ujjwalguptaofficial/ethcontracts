import { BaseContract } from "../abstracts";
import { ILogger } from "../interfaces";
export abstract class BaseWeb3Client {
    public logger: ILogger

    abstract init(): Promise<any>;
    abstract getContract(address: string, abi: any): BaseContract;
    abstract get walletAddress(): string;
}
