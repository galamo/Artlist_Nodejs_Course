// @ts-ignore
const amqp = require("amqplib")
const url = process.env.RMQ_URL || "amqp://localhost"
export async function connectToRMQ(u) {
    try {
        console.log("connectToRMQ")
        return await amqp.connect(u || url)
    } catch (err) {
        console.log("connectToRMQ Error", err)
    }
}
