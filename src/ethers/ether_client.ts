import { providers, Wallet, Contract } from "ethers";
import { BaseWeb3Client } from "../abstracts";
import { EtherContract } from "./contract";

type ETHER_PROVIDER = providers.JsonRpcProvider;
type ETHER_SIGNER = providers.JsonRpcSigner;

export class EthersClient extends BaseWeb3Client {

    private address_;

    provider: ETHER_PROVIDER;
    signer: ETHER_SIGNER;
    name = "ethers"

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

    init(): Promise<any> {
        return this.signer.getAddress().then(address => {
            this.address_ = address;
        });
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