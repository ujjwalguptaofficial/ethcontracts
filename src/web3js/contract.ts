import { Contract } from "web3-eth-contract";
import { BaseContract } from "../abstracts";
import { ILogger } from "../interfaces";
import { ContractMethod } from "./contract_method";

export class Web3Contract extends BaseContract {
    contract: Contract;

    constructor(address: string, contract: Contract, logger: ILogger) {
        super(address, logger);
        this.contract = contract;
    }

    method(methodName: string, ...args) {
        this.logger.log("methodName", methodName, "args method", arguments);
        return new ContractMethod(
            this.address,
            this.logger,
            this.contract.methods[methodName](...args)
        );
    }
}