export interface IERC20 {
    getName(): Promise<string>;
    getDecimals(): Promise<string>;
    getSymbol(): Promise<string>;
    getBalance<T>(userAdddress: string): Promise<T>;
    getTotalSupply<T>(): Promise<T>;
    getAllowance<T>(owner: string, spender: string): Promise<T>;

    // transfer(to: string, amount, tx?: ITransactionRequestOption):Promise<TYPE_>
}