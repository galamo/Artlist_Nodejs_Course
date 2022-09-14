import axios from "axios";
// const data = require("./data.json")
import * as data from "./data.json"
import * as fs from "fs"
type ICountry = typeof data;

export default async function getCountryTemplate() {
    fs.readFile(`${__dirname}/data.json`, "utf-8", (err, res) => {
        return JSON.parse(res)
    })
}