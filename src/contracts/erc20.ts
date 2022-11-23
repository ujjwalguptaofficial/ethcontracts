import { BaseToken } from "./base_token";

export class ERC20 extends BaseToken {

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