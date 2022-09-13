const crypto = require('crypto');
// The static Date.now() method returns the number of milliseconds elapsed since
//  January 1, 1970 00:00:00 UTC.

const start = Date.now()

crypto.pbkdf2("test", "test", 100000, 512, 'sha512', () => {
    console.log(`1: ${Date.now() - start}`)
})

crypto.pbkdf2("test", "test", 100000, 512, 'sha512', () => {
    console.log(`2: ${Date.now() - start}`)
})

crypto.pbkdf2("test", "test", 100000, 512, 'sha512', () => {
    console.log(`3: ${Date.now() - start}`)
})

crypto.pbkdf2("test", "test", 100000, 512, 'sha512', () => {
    console.log(`4: ${Date.now() - start}`)
})

crypto.pbkdf2("test", "test", 100000, 512, 'sha512', () => {
    console.log(`5: ${Date.now() - start}`)
})