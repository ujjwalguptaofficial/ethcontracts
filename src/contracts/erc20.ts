import { BaseToken } from "./base_token";

export class ERC20 extends BaseToken {

    constructor(tokenAddress: string, contractName?: string) {
        super(tokenAddress, contractName || 'erc20');
    }

    getBalance(userAdddress: string) {
        return this.contract.method("balanceOf", userAdddress).read<number>();
    }

    getTotalSupply() {
        return this.contract.method("totalSupply").read<number>();
    }


    // transfer(to, amount)

    // allowance(owner, spender)

    // approve(spender, amount)

    // transferFrom(from, to, amount)
}