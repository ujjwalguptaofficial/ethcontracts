import { IERC20 } from "./erc20";

export interface IERC20Capped extends IERC20 {
    getCapValue(): any;
}