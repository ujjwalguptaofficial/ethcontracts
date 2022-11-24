import { Contract } from "ethers";
import { BaseContract } from "../abstracts";
import { ContractMethod } from "./contract_method";

export class EtherContract extends BaseContract {

    contract: Contract;

    constructor(address: string, contract: Contract, logger) {
        super(address, logger);
        this.contract = contract;
    }

    method(methodName: string, ...args) {
        this.logger.log("args method", arguments);
        return new ContractMethod(
            this.logger, this.contract, methodName, args
        );
    }
}