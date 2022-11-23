import { BaseContractMethod } from "../abstracts";

export abstract class BaseContract {

    constructor(public address: string) {

    }

    abstract method(methodName: string, ...args): BaseContractMethod;
}