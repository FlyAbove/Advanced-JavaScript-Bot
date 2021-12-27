const red = '<:wrong:818403353808732192>'
module.exports = {
    name: 'ping',
    description: "A command to tell bot's latency",
    async execute(message, args, client) {
        message.channel.send({
                embed: {
                    description: `<:Bot:861168647375945748> API Latency is ${Math.round(client.ws.ping)}ms.`,
                    color: message.guild.me.displayColor,
                    footer: {
                        text: `Requested by ${message.author.tag}`
                    }
                }
            })
            .catch(error => {
                console.error(error)
                return message.channel.send({
                    embed: {
                        title: `${red} There was an error while executing this command: ${error}`,
                        color: 'RED'
                    }
                })
            })

    }

}