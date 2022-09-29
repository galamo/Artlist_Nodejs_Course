console.log("My New Server Api starts")
import express from "express" // es6 module
import dotenv from "dotenv"
dotenv.config()
import https from "https"
import fs from "fs"
import { router as countriesRouter } from "./countries";
import { router as loginRouter } from "./login";
import { router as registerRouter } from "./register";

import { commonMiddleware } from "./commonMiddleware"
import authorizationMiddleware from "./commonMiddleware/authorization"

const app = express();
// const privateKey = fs.readFileSync(`${__dirname}/ssl/server.key`)
// const certificate = fs.readFileSync(`${__dirname}/ssl/server.cert`)
// const credentials = { key: privateKey, cert: certificate }



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
app.use("/login", loginRouter)
app.use("/register", registerRouter)
app.use(authorizationMiddleware)
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
    const errorBadRequest = error.isBadRequest;
    const generalMessage = 'Something went wrong';
    if (errorBadRequest) {
        console.log(error.error.message)
        return res.status(400).send(generalMessage)
    }
    console.log('Error in middleware', res.getHeader("x-request-id"))
    return res.status(500).send(generalMessage)
})

// const httpsServer = https.createServer(credentials, app)
app.listen(process.env.PORT)

// httpsServer.listen(process.env.PORT_SSL)


