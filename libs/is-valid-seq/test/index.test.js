const { expect } = require("chai")
const { isValidSeq } = require("../index")

describe("Test lib functionalities", () => {
    it("Function type", () => {
        expect(typeof isValidSeq).to.be.equal("function")
    })
    it("Check if no array sent", () => {
        expect(isValidSeq()).to.be.equal(undefined)
    })

    it("Check if no array sent", function () {
        expect(() => isValidSeq([])).to.throw("Error")
    })
})