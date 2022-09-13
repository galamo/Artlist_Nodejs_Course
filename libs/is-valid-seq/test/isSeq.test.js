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
        expect(() => isValidSeq([])).to.throw("Missing an array")
    })
    it("Test IsValidSeq Success [1,2,3,4], [1,2]", () => {
        // expect(isValidSeq([1], [1])).to.be.equal(true)
    })
    it("Test IsValidSeq Failed results [1,2,3,4], [1,7]", () => {
        expect(isValidSeq([1, 2, 3, 4], [1, 7])).to.be.equal(false)
    })
    it("Test IsValidSeq Failed results [1,2,3,4], [1,7]", () => {
        // create you data in your database
        // pull some http request
        // assert the result in the expect function
        expect(isValidSeq([1, 2, 3, 4], [1, 7])).to.be.equal(false)
    })
})