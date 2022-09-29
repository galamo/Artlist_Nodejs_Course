import axios from "axios";
// const data = require("./data.json")
import * as data from "./data.json"
import * as fs from "fs"
type ICountry = typeof data;

export default async function getCountryTemplate() {
    // const result = await fs.readFile(`${__dirname}/data.json`, "utf-8");
    return new Promise((resolve, reject) => {
        fs.readFile(`${__dirname}/data.json`, "utf-8", (err, res) => {
            if (err) return reject(err)
            return resolve(JSON.parse(res))
        })
    })
}