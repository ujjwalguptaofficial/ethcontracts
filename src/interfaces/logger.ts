export interface ILogger {
    setStatus(value: boolean);

    log(...message): void;
}