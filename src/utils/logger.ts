import { ILogger } from "../interfaces";

export class Logger implements ILogger {

    private isEnabled_: boolean;

    setStatus(value) {
        this.isEnabled_ = value;
    }

    log(...message) {
        if (this.isEnabled_) {
            console.log(...message);
        }
    }
}