
import jwt from "jsonwebtoken";

const users = [
    { userName: 'gal', password: 'pass1' }
]
type User = typeof users[0]

export default async function login(userName: string, password: string): Promise<string> {
    const user = users.find((user: User) => user.password === password && userName === userName)
    if (user) {
        // sign a jwt and response to the client
        // fs.readFile private key
        // use algorithem RSA256
        
        const jwtString = jwt.sign({ userName, isAdmin: true }, process.env.SECRET, { expiresIn: "10h" })
        return jwtString
    } else {
        throw new Error("User not exist")
    }

}