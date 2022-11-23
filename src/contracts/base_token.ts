import { BaseContract, BaseWeb3Client } from "../abstracts";
import { initService, service } from "../services";

export class BaseToken {

    tokenAddress: string;
    private client_: BaseWeb3Client;
    protected contract: BaseContract;
    protected contractName: string;

    constructor(tokenAddress: string, contractName: string) {
        this.tokenAddress = tokenAddress;
        this.contractName = contractName;
    }

    init(client: BaseWeb3Client) {
        this.client_ = client;
        initService();
        return service.abi.getABI(this.contractName).then(abi => {
            this.contract = this.client_.getContract(this.tokenAddress, abi);
        });
    }
}