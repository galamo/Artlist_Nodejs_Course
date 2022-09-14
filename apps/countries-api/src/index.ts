console.log("My New Server Api starts")
import * as express from "express" // es6 module
import * as dotenv from "dotenv"
import { router as countriesRouter } from "./countries";
import { uuidv4 } from "./utils/generateRequest";
import { commonMiddleware } from "./commonMiddleware"
dotenv.config()
const app = express();



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
app.listen(process.env.PORT || 5000)


