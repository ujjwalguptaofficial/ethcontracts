import { BaseContract, BaseContractMethod, BaseWeb3Client } from "../abstracts";
import { globalConfig } from "../global";
import { IERC20, ITransactionRequestConfig } from "../interfaces";
import { initService } from "../services";
import { TYPE_TRANSACTION_WRITE_RESULT } from "../types";
import { merge, ABIManager } from "../utils";

export class BaseToken {

    tokenAddress: string;
    protected client: BaseWeb3Client;
    protected contract: BaseContract;
    protected contractName: string;

    constructor(tokenAddress: string, contractName: string) {
        this.tokenAddress = tokenAddress;
        this.contractName = contractName;
    }

    shouldReturnTx_ = false;

    // common methods
    getName() {
        return this.getProperty<string>("name");
    }

    getSymbol() {
        return this.getProperty<string>("symbol");
    }

    get transactionData(): IERC20 {
        const that = this;
        const proxy = new Proxy({}, {
            get(_, p, __) {
                return new Proxy(that[p].bind(that), {
                    apply(target, thisArg, argArray) {
                        that.shouldReturnTx_ = true;
                        return Reflect.apply(target, thisArg, argArray);
                    },
                });
            }
        });
        return proxy as any;
    }

    init(client: BaseWeb3Client) {
        client.logger = globalConfig.logger;
        this.client = client;
        initService(globalConfig);
        return Promise.all([
            client.init(),
            ABIManager.getABI(this.contractName)
        ]).then(result => {
            const abi = result[1];
            this.contract = this.client.getContract(this.tokenAddress, abi);
        });
    }

    protected createWriteTxConfig(tx?: ITransactionRequestConfig) {
        tx = tx || {};
        tx.from = this.client.walletAddress;
        return tx;
    }

    protected getProperty<T>(property: string) {
        return this.contract.method(
            property
        ).read<T>();
    }

    static config = globalConfig;

    protected writeTransaction(method: BaseContractMethod, txConfig?: ITransactionRequestConfig): TYPE_TRANSACTION_WRITE_RESULT {
        txConfig = this.createWriteTxConfig(txConfig);
        if (this.shouldReturnTx_) {
            const result = merge(txConfig, {
                to: method.address,
                data: method.encodeABI()
            } as ITransactionRequestConfig) as ITransactionRequestConfig;
            this.shouldReturnTx_ = false;
            return result as any;
        }
        return method.write(txConfig);
    }
}