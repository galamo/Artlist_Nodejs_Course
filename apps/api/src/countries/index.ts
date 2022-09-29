import express from "express"
import axios from "axios";
import getFlags from "./handler/getCountries";
import getCountryTemplate from "./handler/getCountryTemplate";
import searchCountry from "./handler/searchCountry";
import joi from "joi"
const { connectToRMQ } = require("../../../../libs/rpc/src/connection")
const { SendToServiceRpc } = require("../../../../libs/rpc/src/SendToServiceRpc")
const connectionPromise = connectToRMQ();

import { validateMiddleware } from "./validations";
import searchCountryByCode from "./handler/searchCountryByCode";
import { logger } from "../logger/logger"
const router = express.Router();
const getProducerQueueName = (pName: string) => `[PRODUCER]${pName.toUpperCase()}::${Date.now()}`;
const producerQueueName = getProducerQueueName("Countries")

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
type ParsedQuery = { search: string }
router.get("/search", validateMiddleware("/countries/search"), async (req: Partial<express.Request>, res: express.Response, next) => {
    const requestId = Date.now().toString() + Math.random() * 99999
    const getLogger = (message) => { logger.info(`${requestId}-${message}`) }
    const args = req?.query?.search || new Date().toUTCString()
    const payload: any = { handler: "searchCountries", args, requestId }
    getLogger("API - countries search request")
    try {
        getLogger("API - Sending to Countries Service")
        const result = await SendToServiceRpc({
            connectionPromise,
            requestId,
            service: "countries-service",
            ...payload,
            replyTo: producerQueueName
        });
        getLogger("API - Got response")
        res.json(result)
    } catch (ex) {
        console.log("Err", ex)
        res.send("error")
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