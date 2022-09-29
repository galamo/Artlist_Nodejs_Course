
import jwt from "jsonwebtoken";
import { getConnection } from "../../db";

const users = [
    { userName: 'gal', password: 'pass1' }
]
type User = typeof users[0]

export default async function login(userName: string, password: string): Promise<string> {
    const users = await loginUserToDB(userName, password)
    const user = users[0]
    console.log(user)
    return new Promise((resolve, reject) => {
        if (user) {
            // sign a jwt and response to the client
            // fs.readFile private key
            // use algorithem RSA256
            jwt.sign({ userName, isAdmin: true }, process.env.SECRET,
                { expiresIn: process.env.JWT_EXPIRATION }, (e, jwt) => {
                    if (e) throw new Error("Error in JWT")
                    return resolve(jwt)
                })
        } else {
            return reject("User is not exist")
        }
    })
}

async function loginUserToDB(userName: string, password: string) {
    const query = `SELECT *
                FROM
                    northwind.users
                WHERE
                    email_address = ? AND password = ? limit 1`
    const [result] = await getConnection().execute(query, [userName, password])
    return result;
}