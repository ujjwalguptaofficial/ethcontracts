import { IERC721Burnable, ITransactionRequestConfig } from "../interfaces";
import { ERC721 } from "./erc721";

export class ERC721Burnable extends ERC721 implements IERC721Burnable {

    constructor(tokenAddress: string, contractName?: string) {
        super(tokenAddress, contractName || "erc721_burnable");
    }

    /**
     * Destroys provided token id
     *
     * @param {*} amount
     * @memberof ERC20Burnable
     */
    burn(tokenId: any, txConfig?: ITransactionRequestConfig) {
        const method = this.contract.method("burn", tokenId);
        return this.writeTransaction(method, txConfig);
    }
}