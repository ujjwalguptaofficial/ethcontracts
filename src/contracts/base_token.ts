import { BaseContract, BaseContractMethod, BaseWeb3Client } from "../abstracts";
import { globalConfig } from "../global";
import { IERC20, ITransactionRequestConfig } from "../interfaces";
import { initService, service } from "../services";
import { TYPE_TRANSACTION_WRITE_RESULT } from "../types";
import { merge } from "../utils";

export class BaseToken {

    tokenAddress: string;
    private client_: BaseWeb3Client;
    protected contract: BaseContract;
    protected contractName: string;

    constructor(tokenAddress: string, contractName: string) {
        this.tokenAddress = tokenAddress;
        this.contractName = contractName;
    }

    shouldReturnTx_ = false;

    get transactionData(): IERC20 {
        const that = this;
        const proxy = new Proxy({}, {
            get(target, p, receiver) {
                return new Proxy(that[p].bind(that), {
                    apply(target, thisArg, argArray) {
                        that.shouldReturnTx_ = true;
                        return Reflect.apply(target, thisArg, argArray);
                    },
                })
            }
        });
        return proxy as any;
    }

    init(client: BaseWeb3Client) {
        client.logger = globalConfig.logger;
        this.client_ = client;
        client.init();
        initService(globalConfig);
        return service.abi.getABI(this.contractName).then(abi => {
            this.contract = this.client_.getContract(this.tokenAddress, abi);
        });
    }

    private createWriteTxConfig_(tx: ITransactionRequestConfig) {
        tx = tx || {};
        tx.from = this.client_.walletAddress;
        return tx;
    }

    protected getProperty<T>(property: string) {
        return this.contract.method(
            property
        ).read<T>();
    }

    static config = globalConfig;

    protected processWriteTransaction(method: BaseContractMethod, tx: ITransactionRequestConfig): Promise<TYPE_TRANSACTION_WRITE_RESULT> {
        tx = this.createWriteTxConfig_(tx);
        if (this.shouldReturnTx_) {
            const result = merge(tx, {
                to: method.address,
                data: method.encodeABI()
            } as ITransactionRequestConfig) as ITransactionRequestConfig;
            this.shouldReturnTx_ = false;
            return result as any;
        }
        return method.write(tx);
    }
}