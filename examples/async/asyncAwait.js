const { getCarsFromServer } = require("./promise")

async function getData() {
    try {
        console.log(333)
        const result = await getCarsFromServer(150);
        console.log("End of getData function")
        console.log(result)
        console.log(233)
    } catch (ex) {
        console.log(ex)
    }

}

console.log(987)
getData()
getData()
console.log(555)
// 987 => 333 => 333 => 555 => 233 => 233 

