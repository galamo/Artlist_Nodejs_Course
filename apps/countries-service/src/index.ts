
const { startConsumer } = require("../../../libs/rpc/src/consumer")
const { connectToRMQ } = require("../../../libs/rpc/src/connection")
import axios from "axios";
import { logger } from "../src/logger/logger"
const rmqConnection = connectToRMQ()

type ParsedQuery = { search: string }

const handlers = {
  searchCountries: async function (args, requestId) {
    try {
      console.log(args, requestId)
      const result = await searchCountry(args as string)
      logger.info(`${requestId} - Countries Service fetch data successfully`)
      return [{ message: result[0] }]
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

startConsumer({ service: "countries-service", handlers, connectionPromise: rmqConnection })
