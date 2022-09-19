
import * as express from "express" // es6 module
import expressRateLimit from "express-rate-limit"
import { uuidv4 } from "../utils/generateRequest";


const commonMiddleware = [];
const ipLimiter = expressRateLimit({
    windowMs: 15 * 60 * 1, // 15 min,
    max: 2

})


function getRequestId(req: express.Request, res: express.Response, next) {
    const requestId = uuidv4();
    req["requestId"] = requestId
    res.setHeader("x-request-id", requestId)
    next()
}
commonMiddleware.push(ipLimiter);
commonMiddleware.push(getRequestId)

export { commonMiddleware }
