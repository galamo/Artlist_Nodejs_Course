import express from "express"
import getFlags from "./handler/getCountries";
import getCountryTemplate from "./handler/getCountryTemplate";
import { validateMiddleware } from "./validations";
import searchCountryByCode from "./handler/searchCountryByCode";
import { connectToRMQ } from "../../../../libs/rpc/src/connection"
import { SendToServiceRpc } from "../../../../libs/rpc/src/sendToServiceRpc"
import { logger } from "../logger/logger"
const rpcConnection = connectToRMQ("");
const getProducerQueueName = (pName: string) => `[PRODUCER]${pName.toUpperCase()}::${Date.now()}`;
const producerQueueName = getProducerQueueName("api-gateway")
const router = express.Router();
router.get("/", async (req: Partial<express.Request>, res: express.Response) => {
    try {
        const result = await getFlags()
        console.log((req as any).requestId)
        res.json(result)
    } catch (ex) {
        console.log(ex)
        res.status(409).json({ message: "Something went wrong" })
    }
})
// type ParsedQuery = { search: string }
router.get("/search", validateMiddleware("/countries/search"), async (req: Partial<express.Request>, res: express.Response, next) => {
    const requestId = (req as any).requestId
    const getLogger = (msg) => { logger.info(`${requestId}-${msg}`) }
    const args = req.query.search;
    const payload = { handler: "searchCountries", args, requestId }
    getLogger(`API-GATEWAY - Search for ${args}`)
    try {
        getLogger(`API-GATEWAY - Search SendToServiceRpc`)
        const result = await SendToServiceRpc({
            connectionPromise: rpcConnection,
            requestId,
            service: "countries-service",
            ...payload,
            replyTo: producerQueueName
        })
        getLogger(`API-GATEWAY - Got response`)
        res.json(result)
    } catch (ex) {
        console.log(ex)
        return next(ex)
    }
})
type ParsedQueryCode = { countryCode: string }
router.get("/code", validateMiddleware("/countries/code"), async (req: Partial<express.Request>, res: express.Response, next) => {
    try {
        const { countryCode } = req.query as ParsedQueryCode
        const result = await searchCountryByCode(countryCode)
        res.json(result)
    } catch (ex) {
        const message = ex.message
        return next(new Error("This is a completely new error"))
    }
})
router.get("/template", async (req: Partial<express.Request>, res: express.Response, next) => {
    try {
        const result = await getCountryTemplate()
        res.json(result)
    } catch (ex) {
        const message = ex.message
        return next(new Error("This is a completely new error"))
    }
})





export { router }