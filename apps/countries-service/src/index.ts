//@ts-ignore
import { connectToRMQ } from "../../../libs/rpc/src/connection"  // install from NPM
//@ts-ignore
import { startConsumer } from "../../../libs/rpc/src/consumer"  // install from NPM
import { logger } from "./logger"
const rpcConnection = connectToRMQ("");
import axios from "axios";

const handlers = {
    searchCountries: async function (args, requestId) {
        try {
            // const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
            // await sleep(5000);
            logger.info(`${requestId} - Countries Service: Recieved message`)
            const result = await searchCountry(args)
            logger.info(`${requestId} - Countries Service: Return message`)
            return result[0]
        } catch (ex) {
            const message = ex.message
            return { isError: true }
        }
    }
}

export default async function searchCountry(searchValue: string): Promise<Array<any>> {
    const result = await axios.get(`https://restcountries.com/v3.1/name/${searchValue}`);
    const { data } = result;
    return data;
}

const serviceName = "countries-service"
startConsumer({ service: serviceName, handlers, connectionPromise: rpcConnection })