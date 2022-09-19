import axios from "axios";
// const data = require("./data.json")
import * as data from "./data.json"

type ICountry = typeof data;

export default async function getCountryByName(name: string): Promise<Array<any>> {
    if (typeof name !== 'string') throw new Error("Missing string paramter")
    const result = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
    const { data } = result;
    const onlyFlags: any[] = data.map((c: ICountry) => { return c })
    return onlyFlags;
}