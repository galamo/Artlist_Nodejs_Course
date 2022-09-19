console.log("My New Server Api starts")
import * as express from "express" // es6 module
import * as dotenv from "dotenv"
import * as https from "https"
import * as http from "https" // run http as parallel
import * as fs from "fs"
import { uuidv4 } from "./utils/generateRequest";
import { router as countriesRouter } from "./countries";
import { commonMiddleware } from "./commonMiddleware"
dotenv.config()

const app = express();
const privateKey = fs.readFileSync(`${__dirname}/ssl/server.key`)
const certificate = fs.readFileSync(`${__dirname}/ssl/server.cert`)
const credentials = { key: privateKey, cert: certificate }


app.use(...commonMiddleware)

app.get('/health-check', (req: express.Request,
    res: express.Response,
    next: express.NextFunction) => {
    // run some logic
    // response to the client
    const currentTime = new Date().toISOString();
    console.log(currentTime, req.url)
    res.send(`Server is Running on Port: 4000 ${currentTime}`)
})
app.get('/long-calculation', async (req: express.Request,
    res: express.Response,
    next: express.NextFunction) => {
    console.log("Starting long calculation")
    // will not help me
    const thisIsStillWrong = await longCalc()
    console.log("Long calculation finished")
    res.send("Long calculation finished")
})

app.use("/countries", countriesRouter)

async function longCalc() {
    return new Promise((resolve, reject): void => {
        for (let index = 0; index < 9999999999; index++) {
        }
        // @ts-ignores
        resolve()
    })
}

app.use((error, req, res: express.Response, next) => {
    console.log('Error in middleware', error, res.getHeader("x-request-id"))
    return res.status(500).send('Something went wrong')
})

const httpsServer = https.createServer(credentials, app)
httpsServer.listen(process.env.PORT_SSL)

