const data = require("./data");

// let y = 10
//
// function calc(x) {
//   return x + y + 3
// }
//
// calc(2);
// calc(2);
// calc(2);
// calc(2);


const getPowerfulCars = () => {
  const horsepower = 150;
  //console.log(data.cars)
  return data.cars.filter((car) => {
    return car.Horsepower >= horsepower;
  })
};

console.log(getPowerfulCars());
