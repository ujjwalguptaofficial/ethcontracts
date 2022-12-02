import { IERC1155Burnable, ITransactionRequestConfig } from "../interfaces";
import { TYPE_TRANSACTION_WRITE_RESULT } from "../types";
import { ERC1155 } from "./erc1155";

export class ERC1155Burnable extends ERC1155 implements IERC1155Burnable {
    burn(account: string, tokenId: any, value: any, txConfig?: ITransactionRequestConfig | undefined): TYPE_TRANSACTION_WRITE_RESULT {
        const method = this.contract.method("burn", account, tokenId, value);
        return this.processWriteTransaction(method, txConfig);
    }

    burnBatch(account: string, tokenIds: any[], values: [], txConfig?: ITransactionRequestConfig | undefined): TYPE_TRANSACTION_WRITE_RESULT {
        const method = this.contract.method("burnBatch", account, tokenIds, values);
        return this.processWriteTransaction(method, txConfig);
    }
}