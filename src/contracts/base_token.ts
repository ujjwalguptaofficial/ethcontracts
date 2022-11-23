import { BaseContract, BaseWeb3Client } from "../abstracts";
import { initService } from "../services";

export class BaseToken {

    tokenAddress: string;
    private client_: BaseWeb3Client;
    protected contract: BaseContract;

    constructor(tokenAddress: string) {
        this.tokenAddress = tokenAddress;
    }

    init(provider) {
        this.client_ = provider;
        this.contract = this.client_.getContract(this.tokenAddress, '');
        initService();
    }
}