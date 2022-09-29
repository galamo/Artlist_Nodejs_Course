import joi from "joi"

const searchSchema = joi.object({
    query: joi.object({
        search: joi.string().required()
    })
})
const codeSchema = joi.object({
    query: joi.object({
        countryCode: joi.string().min(3).max(3).required()
    })
})

const schemas = {
    "/countries/search": searchSchema,
    "/countries/code": codeSchema
}

const getSchemaValidation = (path) => {
    if (schemas[path]) {
        return schemas[path]
    } else {
        throw new Error("missing validation on some entry point ")
    }
}

export function validateMiddleware(path: string) {
    return async function (req, res, next) {
        const currentSchema = getSchemaValidation(path)
        if (!currentSchema) {
            throw new Error(`This entry point is not safe ${req.baseUrl}`)
        }
        // check if its post/get and decide if to validate query OR body
        const { error } = currentSchema.validate({ query: req.query })
        if (error) {
            // return res.status(400).send("Something went wrong (input validation)")
            return next({ error, isBadRequest: true })
        } else {
            return next()
        }
    }
}

// export function validateMiddleware2(req, res, next) {
//     console.log(req.originalUrl.split("?")[0])
//     const currentSchema = getSchemaValidation(req.originalUrl.split("?")[0])
//     if (!currentSchema) {
//         throw new Error(`This entry point is not safe ${req.baseUrl}`)
//     }
//     // check if its post/get and decide if to validate query OR body
//     const { error } = currentSchema.validate({ query: req.query })
//     if (error) {
//         // return res.status(400).send("Something went wrong (input validation)")
//         return next({ error, isBadRequest: true })
//     } else {
//         return next()
//     }
// }