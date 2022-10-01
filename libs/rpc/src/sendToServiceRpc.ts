// @ts-ignore
import { getQueueNameService } from "./utils";
import { createChannel } from "./channel"
import { sendToQueue } from "./sendToQueue";
const correlationResolverMap = {};

export async function SendToServiceRpc(payload) {
    const { args,
        handler,
        requestId,
        service,
        replyTo } = payload
    const queueName = getQueueNameService(service)
    const connection = await payload.connectionPromise
    const channel = await createChannel({
        connection,
        queueName: replyTo,
        options: {
            durable: false
        }
    });
    console.log(`######## ((1)) Producer Send To Consumer: ${queueName} Payload: ${JSON.stringify(payload)}`)

    const correlationId = sendToQueue({
        channel,
        args,
        handler,
        requestId,
        queueName,
        replyTo
    });



    const resultPromise = new Promise(
        (resolve, reject) =>
            (correlationResolverMap[correlationId] = { resolve, reject })
    );

    channel.consume(replyTo, _consumeHandler, {
        noAck: true
    });
    const queuePromiseResolver = await resultPromise
    channel.close()
    return queuePromiseResolver
    async function _consumeHandler(msg) {
        console.log(`######## ((4)) Producer Recieved: ${JSON.parse(msg.content.toString())}`)
        const queueResolverObj = correlationResolverMap[msg.properties.correlationId]
        const responseFromConsumer = JSON.parse(msg.content.toString());
        if (responseFromConsumer.isError) queueResolverObj.reject()
        else queueResolverObj.resolve(JSON.parse(msg.content.toString()))
        // console.log(correlationResolverMap)
        delete correlationResolverMap[msg.properties.correlationId]
    }
}