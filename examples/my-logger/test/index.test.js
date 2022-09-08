const { expect } = require("chai")
const sum = require("../index")

describe("test sum", () => {
    it("test1", () => {
        expect(3).to.be.equal(sum(11, 2))
    })
})