import { providers, Wallet, Contract } from "ethers";
import { BaseWeb3Client } from "../abstracts";
import { promiseResolve } from "../utils";
import { EtherContract } from "./contract";

type ETHER_PROVIDER = providers.JsonRpcProvider;
type ETHER_SIGNER = providers.JsonRpcSigner;

export class EthersClient extends BaseWeb3Client {

    private address_;

    provider: ETHER_PROVIDER;
    signer: ETHER_SIGNER;
    name = "ethers";

    /**
     * signer true means the provider contains signer and can send write tx
     *
     * @private
     * @type {boolean}
     * @memberof EthersClient
     */
    private isSigner_: boolean;

    constructor(provider: ETHER_PROVIDER | Wallet) {
        super();
        if ((provider as ETHER_PROVIDER)._isProvider) {
            this.provider = provider as ETHER_PROVIDER;
            const getSigner = this.provider.getSigner;
            if (getSigner) {
                this.signer = getSigner();
            }
        }
        else {
            this.signer = (provider as any);
            this.provider = ((provider as Wallet).provider) as any;
        }

        this.isSigner_ = (this.signer && this.signer.provider) != null;
    }

    init(): Promise<any> {
        if (this.isSigner_) {
            return this.signer.getAddress().then(address => {
                this.address_ = address;
            });
        }
        return promiseResolve();
    }

    get walletAddress(): string {
        return this.address_;
    }

    getContract(address: string, abi: any) {
        return new EtherContract(
            address,
            new Contract(address, abi, this.isSigner_ ? this.signer : this.provider),
            this.logger
        );
    }
}