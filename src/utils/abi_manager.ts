import { service } from "../services";
import { promiseResolve } from "./promise_resolve";

type TYPE_ABI_CACHE = {
    [contractName: string]: any
};

const cache: TYPE_ABI_CACHE = {};

export class ABIManager {

    getABI(contractName: string): Promise<any> {
        const storedABICache = cache[contractName];

        if (storedABICache) {
            return promiseResolve<any>(storedABICache);
        }
        return service.abi.getABI(
            contractName
        ).then(result => {
            this.setABI(contractName, result);
            return result;
        });
    }

    setABI(contractName: string, abi: any) {
        cache[contractName] = abi;
    }
}