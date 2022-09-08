const axios = require("axios")
async function init() {
    try {
        const result = await axios.get("https://restcountries.com/v3.1/all")
        console.log(Object.keys(result))
        const { data } = result
        // currentCountry.name.common
        console.log(Array.isArray(data))
        const countriesNames = data.map((currentCountry) => {
            return currentCountry?.name?.common
        })
        const findIsr = countriesNames.find((currentCountryName) => {
            return currentCountryName.toLowerCase().includes("isr")
        })
        const findPartialStr = countriesNames.filter((currentCountryName) => {
            return currentCountryName.toLowerCase().includes("united")
        })
        console.log(findIsr, findPartialStr)
        if (!findIsr) throw new Error("Country not Found")
        const sepcificCountry = await axios.get(`https://restcountries.com/v3.1/name/${findIsr}`)
        console.log(sepcificCountry.data[0].region)
    } catch (ex) {
        console.log(ex)
    }
}

init()