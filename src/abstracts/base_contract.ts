import { BaseContractMethod } from "../abstracts";
import { ILogger } from "../interfaces";

export abstract class BaseContract {

    constructor(public address: string, public logger:ILogger) {

    }

    abstract method(methodName: string, ...args): BaseContractMethod;
}