import { BaseContract } from "../abstracts";
import { ILogger } from "../interfaces";
export abstract class BaseWeb3Client {

    constructor(public logger: ILogger) {

    }

    abstract getContract(address: string, abi: any): BaseContract;
}
