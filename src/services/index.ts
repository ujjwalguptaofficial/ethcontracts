import { global } from "../global"
import { ABIService } from "./abi_service"

export * from "./abi_service"

interface IService {
    abi: ABIService
}

export const service: IService = {} as any;

export const initService = () => {
    service.abi = new ABIService(global.abiStoreUrl);
}
