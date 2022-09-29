import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { loadRequestId } from "./helpers/loadRequestId"
import { getRequestId } from "./helpers/getRequestId"
import dotenv from "dotenv"
dotenv.config()


const { API_PORT = 3500 } = process.env;

const app = express();

interface IBootstrapParams {
    routers: {
        [namespace: string]: Array<{ method: string, path: string, middlewares: Array<Function> }>
    }
}
function setErrorHandlers() {
    console.log(
        "Error handler should be the last route"
    );
    app.use(async (err, req, res, next) => {
        const requestId = getRequestId(req);
        console.log("Check here the payload")
        res.status(500).json({ error: "Something went wrong!" });
    });
}

export async function startHttpServer(params: IBootstrapParams) {
    const { routers } = params;
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(loadRequestId);
    app.get("/healthcheck", (req, res) => res.json({ message: "Ok" }));

    await Promise.all(
        Object.entries(routers).map(async ([namespace, nameSpaceRouters]) => {
            const router = express.Router();
            // console.log(namespace, nameSpaceRouters)
            try {
                nameSpaceRouters.forEach((route) => {
                    const { method, path, middlewares } = route
                    router[method](path, ...middlewares)
                })
                app.use(`/${namespace}`, router);
            } catch (error) {
                console.log(error);
            }
        })
    );

    setErrorHandlers();

    return await _startResolver()

    async function _startResolver() {
        return new Promise(resolve => {
            app.listen(API_PORT, () => {
                console.log(`Listen to Port ${API_PORT}`)
                resolve(app);
            });
        });
    }
}

