const crypto = require("crypto")
const { readFile, writeFile, readFileSync, writeFileSync } = require("fs")
const { init } = require("../fetchApiData")
// const start = Date.now()
// for (let index = 0; index < 999999999; index++) {
// }
// console.log(Date.now() - start)
// function init() { }
// init();
process.env.UV_THREADPOOL_SIZE = 4 // Change it if you brave enought

const start = Date.now()

function hashing() {
    crypto.pbkdf2("password", "salta", 100000, 512, "sha512", (error, result) => {
        console.log("1:", Date.now() - start)
    })
    crypto.pbkdf2("password", "salta", 100000, 512, "sha512", (error, result) => {
        console.log("2:", Date.now() - start)
    })
    crypto.pbkdf2("password", "salta", 100000, 512, "sha512", (error, result) => {
        console.log("3:", Date.now() - start)
    })
    crypto.pbkdf2("password", "salta", 100000, 512, "sha512", (error, result) => {
        console.log("4:", Date.now() - start)
    })
    crypto.pbkdf2("password", "salta", 100000, 512, "sha512", (error, result) => {
        console.log("5:", Date.now() - start)
    })

}
console.log("Start reading file...")
readFile("./index.js", "utf-8", () => {
    console.log("readFile:", Date.now() - start)
})
const file1 = readFileSync("./index.js", "utf-8")
console.log("readFileSync:", Date.now() - start)

hashing();


// Exmpale of async operation
// init()
