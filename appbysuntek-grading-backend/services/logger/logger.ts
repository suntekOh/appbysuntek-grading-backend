import { injectable } from "tsyringe";
import { format, Logger, createLogger, transports } from "winston";

export interface ILogger {
    value: Logger;
}

@injectable()
export class CustomLogger implements ILogger {
    public value: Logger;
    constructor() {
        const prefixDate = (new Date()).toISOString().replace(/[^0-9]/g, '').slice(0, -9);
        this.value = createLogger({
            format: format.combine(
                format.timestamp(),
                format.json()
            ),
            transports: [
                new (transports.File)({
                    filename: `logs/${prefixDate}-filelog-info.log`,
                    level: 'info'
                }),
                new (transports.File)({
                    filename: `logs/${prefixDate}-filelog-error.log`,
                    level: 'error'
                })
            ]
        });
    }

}
