import { providers, Wallet, utils, Contract, ethers, BigNumber } from "ethers";
import { BaseWeb3Client } from "../abstracts";
import { ITransactionRequestConfig } from "../interfaces";
import { EtherContract } from "./contract";

type ETHER_PROVIDER = providers.JsonRpcProvider;
type ETHER_SIGNER = providers.JsonRpcSigner;

export class EtherWeb3Client extends BaseWeb3Client {

    provider: ETHER_PROVIDER;
    signer: ETHER_SIGNER;

    constructor(provider: ETHER_PROVIDER | Wallet) {
        super();
        if ((provider as ETHER_PROVIDER)._isProvider) {
            this.provider = provider as ETHER_PROVIDER;
            this.signer = this.provider.getSigner();
        }
        else {
            this.signer = (provider as any);
            this.provider = ((provider as Wallet).provider) as any;
        }
    }

    private address_;


    init(): Promise<any> {
        return this.signer.getAddress().then(address => {
            this.address_ = address;
        })
    }

    get walletAddress(): string {
        return this.address_;
    }

    getContract(address: string, abi: any) {
        return new EtherContract(
            address,
            new Contract(address, abi, this.signer),
            this.logger
        );
    }
}