import Web3 from "web3";
import { ITransactionRequestConfig } from "../interfaces";
import { TransactionConfig } from "web3-core";

export const txRequestConfigToWeb3 = (config: ITransactionRequestConfig) => {
    if (config) {
        const toHex = Web3.utils.toHex;
        config.chainId = toHex(config.chainId as any) as any;
        config.type = toHex(config.type as any) as any;
    }
    return config as TransactionConfig;
}