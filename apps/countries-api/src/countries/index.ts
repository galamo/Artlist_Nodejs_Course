import * as express from "express"
import axios from "axios";
import getFlags from "./handler/getCountries";
import getCountryTemplate from "./handler/getCountryTemplate";
const router = express.Router();
//http://localhost:PORT/countries/
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