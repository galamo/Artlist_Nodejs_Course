import { getCorrelationId } from "./utils"
interface ISendToQueue {
    channel: any,
    replyTo: string,
    args: any,
    handler: any,
    requestId: string
    queueName: any
}

export function sendToQueue(payload: ISendToQueue) {
    const { handler,
        args,
        requestId, replyTo } = payload
    const content = {
        handler,
        args,
        requestId,
    }
    console.log("payload.queueName", payload.queueName, "replyTo", replyTo)
    const contentBuffer = Buffer.from(JSON.stringify(content));
    const correlationId = getCorrelationId(payload.requestId);
    payload.channel.sendToQueue(payload.queueName, contentBuffer, {
        correlationId,
        replyTo,
        headers: { timeStamp: Date.now() }
    });
    return correlationId;

}