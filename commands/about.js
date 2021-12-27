const red = '<:wrong:818403353808732192>'

module.exports = {
    name: 'about',
    description: 'A developers info command',
    async execute(message, args, client) {

        message.channel.send({
                embed: {
                    color: message.guild.me.displayColor,
                    title: `Information about ${client.user.tag}`,
                    description: '\n<:greendot:861017374173954048> Node Version\n[16.13.1](https://nodejs.org/en/)\n\n<:greendot:861017374173954048> Library\n[discord.js v12.5.3](https://discord.js.org/#/)\n\n<:greendot:861017374173954048> Developer\n[FlyAbove](https://github.com/FlyAbove)\n\n<:greendot:861017374173954048> Code Editor\n[Visual Studio Code](https://code.visualstudio.com/download)\n\n<:greendot:861017374173954048> Privacy Policy\n[Link](https://github.com/FlyAbove/privacy)\n\n<:greendot:861017374173954048> Github Repository\n[Repository](https://github.com/FlyAbove/advanced-discordbot)\n\n<:greendot:861017374173954048> Support the project\n[Donate here](https://www.patreon.com/lonelydev0304?fan_landing=true)',
                    footer: {
                        text: `Requested by ${message.author.tag}`,

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