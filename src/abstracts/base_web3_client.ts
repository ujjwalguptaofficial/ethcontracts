import { BaseContract } from "../abstracts";
import { ILogger } from "../interfaces";
export abstract class BaseWeb3Client {
    public logger: ILogger

    abstract getContract(address: string, abi: any): BaseContract;
}
