// @ts-ignore
import safeJsonStringify from "safe-json-stringify";
// @ts-ignore
export const appQueueName = (pName: string) => `PRODUCER-${pName.toUpperCase()}::${Date.now()}`;
// @ts-ignore
export const getQueueNameService = (service: string) => {
    return `CONSUMER-${service.toUpperCase()}`;
};

export const getCorrelationId = (requestId: string) => {
    return `${requestId}#${Date.now()}`;
};

export function safeStringify(object) {
    let jsonString;
    try {
        jsonString = JSON.stringify(object);
    } catch (e) {
        jsonString = safeJsonStringify(object);
    }
    return jsonString;
}