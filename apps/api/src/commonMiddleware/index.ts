
import * as express from "express" // es6 module
import expressRateLimit from "express-rate-limit"
import { uuidv4 } from "../utils/generateRequest";
import bodyParser from "body-parser";
import compression from "compression"
import helmet from "helmet"
const commonMiddleware = [];
const ipLimiter = expressRateLimit({
    windowMs: 15 * 60 * 1000, // 15 min,
    max: 1000

})


function getRequestId(req: express.Request, res: express.Response, next) {
    const requestId = uuidv4();
    req["requestId"] = requestId
    res.setHeader("x-request-id", requestId)
    next()
}

commonMiddleware.push(ipLimiter);
commonMiddleware.push(getRequestId)
commonMiddleware.push(bodyParser.json())
commonMiddleware.push(compression())
commonMiddleware.push(helmet())

export { commonMiddleware }
