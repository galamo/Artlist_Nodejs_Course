const chai = require("chai")
const { expect } = chai;
const { isValidSeq } = require("../index")
// suite => test => steps
describe("Testing IsValidSeq", () => {
    it("isValidSeq is Function", () => {
        expect(typeof isValidSeq).to.be.equal("function")
    })
    it("Test IsValidSeq results null,null", () => {
        expect(isValidSeq()).to.be.equal(undefined)
    })
    it("Test IsValidSeq results [],null", () => {
        expect(isValidSeq([])).to.be.equal(undefined)
    })
})