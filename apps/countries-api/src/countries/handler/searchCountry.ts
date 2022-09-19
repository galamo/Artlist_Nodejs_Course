import axios from "axios";
// const data = require("./data.json")
import * as data from "./data.json"

type ICountry = typeof data;

export default async function searchCountry(searchValue: string): Promise<Array<any>> {
    const result = await axios.get(`https://restcountries.com/v3.1/name/${searchValue}`);
    const { data } = result;
    const onlyFlags: any[] = data.map((c: ICountry) => { return c.flag })
    return onlyFlags;
}