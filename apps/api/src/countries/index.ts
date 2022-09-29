import express from "express"
import axios from "axios";
import getFlags from "./handler/getCountries";
import getCountryTemplate from "./handler/getCountryTemplate";
import searchCountry from "./handler/searchCountry";
import joi from "joi"
import { validateMiddleware } from "./validations";
import searchCountryByCode from "./handler/searchCountryByCode";
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
type ParsedQuery = { search: string }
router.get("/search", validateMiddleware("/countries/search"), async (req: Partial<express.Request>, res: express.Response, next) => {
    try {
        const { search } = req.query as ParsedQuery
        const result = await searchCountry(search)
        res.json(result)
    } catch (ex) {
        const message = ex.message
        return next(new Error("This is a completely new error"))
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