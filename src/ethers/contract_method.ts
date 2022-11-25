import { ILogger, ITransactionRequestConfig } from "../interfaces";
import { BaseContractMethod } from "../abstracts";
import { TYPE_GET_TRANSACTION_HASH, TYPE_GET_TRANSACTION_RECEIPT } from "../types";
import { BigNumber, Contract, PopulatedTransaction, providers } from "ethers";

export class ContractMethod extends BaseContractMethod {

    constructor(logger: ILogger, private contract_: Contract, private methodName_, private args_) {
        super(logger);
    }

    get address() {
        return this.contract_.address;
    }

    read<T>(config: ITransactionRequestConfig): Promise<T> {
        this.logger.log("sending tx with config", config);
        return this.getMethod_(config);
    }

    private getMethod_(config: ITransactionRequestConfig = {}) {
        return this.contract_[this.methodName_](...this.args_, this.toConfig_(config));
    }

    toBigNumber(value) {
        return value ? BigNumber.from(value) : value;
    }

    private toConfig_(config: ITransactionRequestConfig = {}) {
        if (config) {
            const toBigNumber = this.toBigNumber;
            return {
                to: config.to,
                from: config.from,
                gasPrice: toBigNumber(config.gasPrice),
                gasLimit: toBigNumber(config.gasLimit),
                value: toBigNumber(config.value),
                nonce: config.nonce,
                // chainId: config.chainId,
                data: config.data,
                type: config.type,
                maxFeePerGas: toBigNumber(config.maxFeePerGas),
                maxPriorityFeePerGas: toBigNumber(config.maxPriorityFeePerGas),

            } as PopulatedTransaction;
        }
        return config;
    }

    write(config: ITransactionRequestConfig) {
        const promiseResult: Promise<providers.TransactionResponse> = this.getMethod_(config);

        let onTransactionHash, onTransactionError;
        const txHashPromise = new Promise<string>((res, rej) => {
            onTransactionHash = res;
            onTransactionError = rej;
        });
        let onTransactionReceipt, onTransactionReceiptError;
        const txReceiptPromise = new Promise<any>((res, rej) => {
            onTransactionReceipt = res;
            onTransactionReceiptError = rej;
        });

        promiseResult.then(response => {
            onTransactionHash(response.hash);
            setTimeout(() => {
                response.wait().then(receipt => {
                    onTransactionReceipt(receipt);
                });
            }, 0);
        });

        const getTransactionHash: TYPE_GET_TRANSACTION_HASH = () => {
            return txHashPromise;
        };
        const getTransactionReceipt: TYPE_GET_TRANSACTION_RECEIPT = <T_RECEIPT>(): Promise<T_RECEIPT> => {
            return txReceiptPromise;
        };
        return [getTransactionHash, getTransactionReceipt] as any;
    }

    encodeABI() {
        return this.contract_.interface.encodeFunctionData(this.methodName_, this.args_);
    }
}
