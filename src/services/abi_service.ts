import { HttpRequest } from "../utils";

export class ABIService {
    private httpRequest_: HttpRequest;

    constructor(baseUrl: string) {
        this.httpRequest_ = new HttpRequest(baseUrl);
    }

    getABI(contractName: string) {
        const url = `abi/${contractName}.json`;
        return this.httpRequest_.get(url);
    }
}