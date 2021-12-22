    module.exports = {
        name: 'ping',
        description: "A command to tell bot's latency",
        async execute(message, args, client) { 
            message.channel.send(`API Latency is ${Math.round(client.ws.ping)}ms.`)
        }
    }