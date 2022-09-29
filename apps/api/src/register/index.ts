import express from "express"
import register from "./handler/register";
const router = express.Router();

router.post("/", async (req: Partial<express.Request>, res: express.Response) => {
    try {
        // validate userName & password
        const { userName, password, firstName, lastName, company } = req.body;
        const result = await register({ userName, password, firstName, lastName, company })
        res.json(result)
    } catch (ex) {
        console.log(ex)
        res.status(401).json({ message: "Unauthorized" })
    }
})


export { router }