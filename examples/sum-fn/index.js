function sumNumbers(num1, num2) {
    if (typeof num1 !== 'number') throw new Error("num1 is not a number")
    if (typeof num2 !== 'number') throw new Error("num2 is not a number")
    return num1 + num2
}
// similar to default export
module.exports = sumNumbers
// exports an object with key: sumNumbers and the value is the function
// module.exports = { sumNumbers }
