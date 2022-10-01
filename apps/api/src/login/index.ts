import express from "express"
import login from "./handler/login";
import { connectToRMQ } from "../../../../libs/rpc/src/connection"
import { SendToServiceRpc } from "../../../../libs/rpc/src/sendToServiceRpc"
import { logger } from "../logger/logger"
const rpcConnection = connectToRMQ("");
const getProducerQueueName = (pName: string) => `[PRODUCER]${pName.toUpperCase()}::${Date.now()}`;
const producerQueueName = getProducerQueueName("api-gateway")

const router = express.Router();


router.get("/health-check", async (req: Partial<express.Request>, res: express.Response) => {
    try {
        res.json({ message: "ok" })
    } catch (ex) {
        console.log(ex)
        res.status(401).json({ message: "Unauthorized" })
    }
})


router.post("/", async (req: Partial<express.Request>, res: express.Response) => {
    try {
        // validate userName & password
        const { userName, password } = req.body;
        const result = await login(userName, password)
        res.json(result)
    } catch (ex) {
        console.log("error in login")
        const requestId = (req as any).requestId
        const getLogger = (msg) => { logger.info(`${requestId}-${msg}`) }
        const args = "sending email due to spam unathorized user";
        const payload = { handler: "sendEmail", args, requestId }
        getLogger(`API-GATEWAY - Login SendToServiceRpc`)
        SendToServiceRpc({
            connectionPromise: rpcConnection,
            requestId,
            service: "email-sender",
            ...payload,
            replyTo: producerQueueName
        })
        getLogger(`API-GATEWAY - Got response`)
        res.status(401).json({ message: "Unauthorized" })
    }
})


export { router }