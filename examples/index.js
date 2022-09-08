const sum = require("./sum-fn")
// const { isValidSeq } = require("../libs/is-valid-seq")
const { isValidSeq } = require("is-valid-seq")
console.log(sum(1, 2))
console.log(isValidSeq([1, 2, 3, 4], [1, 4]))
console.log(isValidSeq([1, 2, 3, 4], [4, 1]))

const users = ["shlomo", "yoni", "adi"]
function changeObj(usersArray) {
    const usersCopy = [...usersArray]
    usersCopy.pop()
    return usersCopy
}
changeObj(users)
const result = changeObj(users)
console.log("global array object " + users)
console.log("function result object " + result)

const theNumber = getNumber()
function getNumber() {
    return 1;
}
console.log(theNumber);
// const / let => 
console.log(typeof returnOnly1)
console.log(returnOnly1())
var returnOnly1 = () => 1
