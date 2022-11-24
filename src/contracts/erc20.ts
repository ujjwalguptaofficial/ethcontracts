import { IERC20, ITransactionRequestConfig } from "../interfaces";
import { BaseToken } from "./base_token";

export class ERC20 extends BaseToken implements IERC20 {

    constructor(tokenAddress: string, contractName?: string) {
        super(tokenAddress, contractName || 'erc20');
    }

    getName() {
        return this.getProperty<string>("name");
    }

    getDecimals() {
        return this.getProperty<string>("decimals");
    }

    getSymbol() {
        return this.getProperty<string>("symbol");
    }

    getBalance<T>(userAdddress: string) {
        return this.contract.method("balanceOf", userAdddress).read<T | any>();
    }

    getTotalSupply<T>() {
        return this.contract.method("totalSupply").read<T | any>();
    }

    getAllowance<T>(owner: string, spender: string) {
        return this.contract.method("allowance", owner, spender).read<T | any>();
    }

    transfer(to: string, amount, tx?: ITransactionRequestConfig) {
        const method = this.contract.method("transfer", to, amount.toString());
        return this.processWriteTransaction(method, tx);
    }


    approve(spender: string, amount, tx?: ITransactionRequestConfig) {
        const method = this.contract.method("approve", spender, amount.toString());
        return this.processWriteTransaction(method, tx);
    }


    transferFrom(from: string, to: string, amount, tx?: ITransactionRequestConfig) {
        const method = this.contract.method("transferFrom", from, to, amount.toString());
        return this.processWriteTransaction(method, tx);
    }

    // increaseAllowance(spender: string, addedValue, tx?: ITransactionRequestOption) {
    //     return this.contract.method("increaseAllowance", spender, addedValue.toString()).write(
    //         this.createWriteTxConfig_(tx)
    //     );
    // }

    // decreaseAllowance(spender: string, subtractedValue, tx?: ITransactionRequestOption) {
    //     return this.contract.method("decreaseAllowance", spender, subtractedValue.toString()).write(
    //         this.createWriteTxConfig_(tx)
    //     );
    // }
}