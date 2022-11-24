import { BaseContract, BaseWeb3Client } from "../abstracts";
import { globalConfig } from "../global";
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
        client.logger = globalConfig.logger;
        this.client_ = client;
        initService(globalConfig);
        return service.abi.getABI(this.contractName).then(abi => {
            this.contract = this.client_.getContract(this.tokenAddress, abi);
        });
    }

    static config = globalConfig;
}