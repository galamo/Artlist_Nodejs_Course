const { expect } = require("chai");
require("dotenv").config()
const axios = require("axios")

describe("health-check", () => {
    it("Should return Ok message ", async () => {
        const { data } = await axios.get(`${process.env.BASE_URL}/login/health-check`)
        expect(data.message).to.be.equal("ok")
    })
})