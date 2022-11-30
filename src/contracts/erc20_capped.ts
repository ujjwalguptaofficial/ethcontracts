import { IERC20Capped } from "../interfaces";
import { ERC20 } from "./erc20";

export class ERC20Capped extends ERC20 implements IERC20Capped {
    getCapValue<T>() {
        return this.contract.method("cap").read<T>();
    }
}