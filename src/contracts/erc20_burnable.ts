import { IERC20Burnable, ITransactionRequestConfig } from "../interfaces";
import { ERC20 } from "./erc20";

export class ERC20Burnable extends ERC20 implements IERC20Burnable {

    constructor(tokenAddress: string, contractName?: string) {
        super(tokenAddress, contractName || "erc20_burnable");
    }

    /**
     * Destroys amount tokens from the caller.
     *
     * @param {*} amount
     * @memberof ERC20Burnable
     */
    burn(amount: any, txConfig?: ITransactionRequestConfig) {
        const method = this.contract.method("burn", amount);
        return this.writeTransaction(method, txConfig);
    }

    /**
     * Destroys amount tokens from account, deducting from the caller’s allowance.
     *
     * @param {string} account
     * @param {*} amount
     * @param {ITransactionRequestConfig} [txConfig]
     * @return {*} 
     * @memberof ERC20Burnable
     */
    burnFrom(account: string, amount: any, txConfig?: ITransactionRequestConfig) {
        const method = this.contract.method("burnFrom", account, amount);
        return this.writeTransaction(method, txConfig);
    }
}