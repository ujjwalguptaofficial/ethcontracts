import { ITransactionRequestConfig } from "../interfaces";
import { BaseToken } from "./base_token";

export class ERC20 extends BaseToken {

    constructor(tokenAddress: string, contractName?: string) {
        super(tokenAddress, contractName || 'erc20');
    }

    getBalance<T>(userAdddress: string) {
        return this.contract.method("balanceOf", userAdddress).read<T | any>();
    }

    getTotalSupply<T>() {
        return this.contract.method("totalSupply").read<T | any>();
    }

    getAllowance<T>(owner: string, spender: string) {
        return this.contract.method("allowance", owner, spender).read<T>();
    }

    transfer(to: string, amount, tx?: ITransactionRequestConfig) {
        return this.contract.method("transfer", to, amount.toString()).write(
            this.createWriteTxConfig_(tx)
        );
    }


    approve(spender: string, amount, tx?: ITransactionRequestConfig) {
        return this.contract.method("approve", spender, amount.toString()).write(
            this.createWriteTxConfig_(tx)
        );
    }


    transferFrom(from: string, to: string, amount, tx?: ITransactionRequestConfig) {
        return this.contract.method("transferFrom", from, to, amount.toString()).write(
            this.createWriteTxConfig_(tx)
        );
    }

    increaseAllowance(spender: string, addedValue, tx?: ITransactionRequestConfig) {
        return this.contract.method("increaseAllowance", spender, addedValue.toString()).write(
            this.createWriteTxConfig_(tx)
        );
    }

    decreaseAllowance(spender: string, subtractedValue, tx?: ITransactionRequestConfig) {
        return this.contract.method("decreaseAllowance", spender, subtractedValue.toString()).write(
            this.createWriteTxConfig_(tx)
        );
    }
}