export interface ITransactionRequestConfig {
    from?: string;
    to?: string;
    value?: number | string | any;
    gasLimit?: number | string;
    gasPrice?: number | string | any;
    data?: string;
    nonce?: number;
    chainId?: number;
    chain?: string;
    hardfork?: string;
    maxFeePerGas?: number | string;
    maxPriorityFeePerGas?: number | string;
    type?: number;
}