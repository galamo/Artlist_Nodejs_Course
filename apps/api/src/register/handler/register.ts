
import jwt from "jsonwebtoken";
import { getConnection } from "../../db";
import { RowDataPacket } from "mysql2"

const users = [
    { userName: 'gal', password: 'pass1' }
]
type User = typeof users[0]

export interface IUserPayload {
    userName: string
    password: string
    firstName: string
    lastName: string
    company: string
}
export default async function register(userPayload: IUserPayload) {
    const result = await insertUserIntoDB(userPayload)
    return result.insertId

}



async function insertUserIntoDB(userPayload: IUserPayload): Promise<RowDataPacket> {
    const { userName, password, firstName, lastName, company } = userPayload
    const query = `INSERT INTO northwind.users (company, last_name, first_name, email_address, password) VALUES (?,?,?,?,?);`
    const [result] = await getConnection().execute(query, [company, lastName, firstName, userName, password])
    return result as RowDataPacket;
}