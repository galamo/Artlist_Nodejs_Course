interface IParams {
    connection: any,
    queueName: string,
    options: any
}
export async function createChannel(params: IParams) {
    const channel = await params.connection.createChannel();
    await channel.assertQueue(params.queueName, params.options)
    return channel;
}