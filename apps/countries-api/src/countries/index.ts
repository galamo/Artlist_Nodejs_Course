import * as express from "express"
import axios from "axios";
import * as joi from "joi"
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

router.get("/template", validate, async (req: Partial<express.Request>, res: express.Response, next) => {
    try {
        const result = await getCountryTemplate()
        res.json(result)
    } catch (ex) {
        const message = ex.message
        return next(new Error("This is a completely new error"))
    }
})


export { router }

export const searchSchema = joi.object({
    query: joi.object({
        search: joi.string().required()
    })
})


const schemas = {
    "/countries/template": searchSchema,

    // "/users": usersSchema
}

export function getSchemaValidation(path) {
    const current = schemas[path]
    return current
}

export function validate(req, res, next) {
    const schemaValidation = getSchemaValidation(req.originalUrl.split("?")[0])
    console.log(req.originalUrl)
    const { error } = schemaValidation.validate({ query: req.query });
    if (error) {
        return next({ ...new Error(), isBadReuqest: true })
    }
    return next();
}

export function validate2(path) {
    return async function (req, res, next) {
        const schemaValidation = getSchemaValidation(path)
        console.log(path)
        const { error } = schemaValidation.validate({ query: req.query });
        if (error) {
            return next({ ...new Error(), isBadReuqest: true })
        }
        return next();
    }
}
