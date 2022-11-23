import { BaseContract } from "../abstracts";

export abstract class BaseWeb3Client {
    abstract getContract(address: string, abi: any): BaseContract;
}
