const crypto = require("crypto")
const { readFile, readFileSync } = require("fs")
const { init } = require("../fetchApiData")
// const start = Date.now()
// for (let index = 0; index < 999999999; index++) {
// }
// console.log(Date.now() - start)
// function init() { }
// init();
process.env.UV_THREADPOOL_SIZE = 6 // Change it if you brave enought
const start = Date.now()
readFileSync("test.file.txt", "utf-8")
console.log("File read Sync :", Date.now() - start)

readFile("test.file.txt", "utf-8", () => {
    console.log("File read :", Date.now() - start)
})
crypto.pbkdf2("password", "salta", 100000, 512, "sha512", (error, result) => {
    console.log("Hash 1:", Date.now() - start)
})
crypto.pbkdf2("password", "salta", 100000, 512, "sha512", (error, result) => {
    console.log("Hash 2:", Date.now() - start)
})
crypto.pbkdf2("password", "salta", 100000, 512, "sha512", (error, result) => {
    console.log("Hash 3:", Date.now() - start)
})
crypto.pbkdf2("password", "salta", 100000, 512, "sha512", (error, result) => {
    console.log("Hash 4:", Date.now() - start)
})
crypto.pbkdf2("password", "salta", 100000, 512, "sha512", (error, result) => {
    console.log("Hash 5:", Date.now() - start)
})

// Exmpale of async operation
// init()
