const userArrow = {
    name: "gal",
    sayHi: () => {
        console.log(this, "with arrow function")
    }
}
const userFn = {
    name: "gal",
    sayHi: function () {
        console.log(this, "with regular function")
    }
}
userArrow.sayHi();
userFn.sayHi()
const outerScope = userFn.sayHi;
outerScope.bind(userFn)();
outerScope.apply(this, null)


module.exports = {}


//BIND
//  The bind() method creates a new function that,
//  when called, has its this keyword set to the provided value,
//  with a given sequence of arguments preceding any provided 
//  when the new function is called.

// function creates a new bound function

// The call() method calls the function with a given this value and arguments provided individually.


