const Discord = require('discord.js')
const config = require('../config.json')

module.exports = {
    name: 'av',
    aliases: 'avatar',
    description: 'A avatar command for users',
    async execute(message, args, client, bot) {

        const target = message.mentions.users.first() || message.author

        let embed = new Discord.MessageEmbed()
        if (!message.mentions.users.first()) {
            embed.setTitle('Your Avatar')
            embed.setImage(message.author.displayAvatarURL({
                size: 1024,
                dynamic: true
            }))
            embed.setColor(`${config.ok}`)
            embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
            return message.channel.send(embed)

        } else {
            embed.setTitle(`${target.tag}'s Avatar`)
            embed.setImage(message.author.displayAvatarURL({
                size: 1024,
                dynamic: true
            }))
            embed.setColor(`${config.ok}`)
            embed.setFooter(`Requested by ${message.author.tag}`, target.displayAvatarURL)
            return message.channel.send(embed)

        }

    }
}