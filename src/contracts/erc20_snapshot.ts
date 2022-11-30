import { IERC20Snapshot } from "../interfaces";
import { ERC20 } from "./erc20";

export class ERC20Snapshot extends ERC20 implements IERC20Snapshot {

    getBalanceAt<T>(account: string, snapshotId: any): Promise<T> {
        return this.contract.method("balanceOfAt", account, snapshotId).read<T>();
    }

    getTotalSupplyAt<T>(snapshotId: any): Promise<T> {
        return this.contract.method("totalSupplyAt", snapshotId).read<T>();
    }
}