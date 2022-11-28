import { TransactionConfig } from "web3-core";
import { ITransactionRequestConfig } from "../interfaces";
import { Web3Client } from "./web3_client";

export const txRequestConfigToWeb3 = (config: ITransactionRequestConfig) => {
    if (config) {
        const toHex = Web3Client.getModule().utils.toHex;
        config.chainId = toHex(config.chainId as any) as any;
        config.type = toHex(config.type as any) as any;
    }
    return config as TransactionConfig;
};