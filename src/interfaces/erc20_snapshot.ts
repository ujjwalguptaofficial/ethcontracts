import { IERC20 } from "./erc20";

export interface IERC20Snapshot extends IERC20 {
    getBalanceAt<T>(account: string, snapshotId: any): Promise<T>;
    getTotalSupplyAt<T>(snapshotId): Promise<T>;
}