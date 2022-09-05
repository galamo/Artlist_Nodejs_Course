const data = require("../data");

function getCarsFromServer(hp) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!hp) return reject("Missing Pram")
            const result = data?.cars?.filter(car => car.Horsepower > hp)
            resolve(result)
        }, 3000)
    })
}

console.log("start of script")
getCarsFromServer(150).then(result => console.log(result)).catch(err => console.log(err))
getCarsFromServer().then(result => console.log(result)).catch(err => console.log(err))
console.log("end of script")
