import { ITransactionRequestConfig } from "../interfaces";
import { BaseToken } from "./base_token";

export class NativeToken extends BaseToken {

    getBalance<T>(userAdddress: string): Promise<any> {
        return this.client.getBalance<T>(userAdddress);
    }

    transfer(to: string, amount: any, tx?: ITransactionRequestConfig) {
        const txConfig = this.createWriteTxConfig(tx);
        txConfig.to = to;
        txConfig.value = amount;
        return this.client.sendTransaction(txConfig);
    }
}