import { Client } from "pg"

const client = new Client({
    host: 'localhost',
    database: 'mydb',
    password: 'pass',
    port: 3211,
})
client.connect()
// on client connect/error events
async function postgressQuery(q) {
    console.log(q);
    const result = await client.query(q)
    return result
}

export { postgressQuery }