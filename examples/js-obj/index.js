
const user = {
    userName: "Yonih",
    country: "israel",
    sayHi: function () {
        console.log(this.userName)
    }
}
// regular function in js
user.sayHi()
const sayHiGlobalScope = user.sayHi
sayHiGlobalScope.bind(user)()
sayHiGlobalScope.apply(user, null)
console.log(this)
user.password = "12345"
console.log(user)




