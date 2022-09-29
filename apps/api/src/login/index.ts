import express from "express"
import login from "./handler/login";
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
        console.log(ex)
        res.status(401).json({ message: "Unauthorized" })
    }
})


export { router }