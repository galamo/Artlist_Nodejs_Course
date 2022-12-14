import winston from "winston";
import moment from "moment";


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: `logs/log-${moment().format("DD-MM-YYYY")}/error.log`, level: 'error' }),
        new winston.transports.File({ filename: 'logs/log/info.log', level: 'info' })
    ]
});

export { logger }