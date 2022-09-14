import * as express from "express"
import axios from "axios";
import getFlags from "./handler/getCountries";
const router = express.Router();
//http://localhost:PORT/countries/
router.get("/", async (req: express.Request, res: express.Response) => {
    try {
        const result = await getFlags()
        res.json(result)
    } catch (ex) {
        console.log(ex)
        res.status(409).json({ message: "Something went wrong" })
    }
})

export { router }