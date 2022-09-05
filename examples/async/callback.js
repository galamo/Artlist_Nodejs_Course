const data = require("../data");

function getCarsFromServer(callbackFn, hp) {
    setTimeout(() => {
        if (typeof callbackFn !== "function") return;
        if (typeof hp !== "number") return;
        callbackFn(data?.cars?.filter(car => car.Horsepower > hp))
    }, 3000)
}

console.log("start of script")
const cbFn = (result) => {
    if (!Array.isArray(result)) return;
    console.log(result)
}
getCarsFromServer(cbFn, 150)
console.log("end of script")
