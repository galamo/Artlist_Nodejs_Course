const username: string = "Gal Amouyal"
console.log(username);
console.log(username, 1)
const user = { age: 33, userName: username }
interface IAddress {
    street: string,
    city: string,
    building: number
}

const address: IAddress =
{
    city: "ashdod", street: "arie-b",
    building: 11
}
function init(): void {
    console.log(address)
}

init();
init();
init();
init();