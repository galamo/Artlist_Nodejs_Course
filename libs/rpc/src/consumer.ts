import { getQueueNameService, safeStringify } from "./utils"
import { createChannel } from "./channel";


export async function startConsumer({
    connectionPromise,
    service,
    handlers
}) {
    const queueName = getQueueNameService(service);
    const connection = await connectionPromise;
    const channel = await createChannel({
        connection,
        queueName,
        options: { durable: false }
    });
    channel.prefetch(1);
    channel.consume(queueName, async function (msg) {
        const payload = JSON.parse(msg.content.toString());
        console.log(`######## ((2)) Consumer Recieved:${queueName} ${JSON.stringify(payload)}`);
        console.log(handlers)
        if (typeof handlers[payload.handler] !== 'function') {
            channel.ack(msg);
            return;
        } // reply with error
        const result = await handlers[payload.handler](payload.args, payload.requestId)
        console.log(`######## ((3)) Consumer Reply to Producer ${msg.properties.replyTo} Payload: ${JSON.stringify(result)}`,);
        channel.sendToQueue(msg.properties.replyTo,
            Buffer.from(JSON.stringify({ result, isError: payload.args === "send_error" })), {
            correlationId: msg.properties.correlationId
        });
        channel.ack(msg);
    });

    return {
        queueName
    };

}