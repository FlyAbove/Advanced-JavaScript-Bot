const config = require('../config.json');
module.exports = {
    name: 'kick',
    description: 'A kick command for moderators',
    async execute(message, args, client, bot) {
        const member = message.mentions.members.first()
        if (!message.member.hasPermission('KICK_MEMBERS'))
            return message.channel.send({
                embed: {
                    title: `${config.red} You don't have __KICK MEMBERS__ permission to use this command`,
                    color: `${config.no}`
                }
            })

        if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
            return message.channel.send({
                embed: {
                    title: `${config.red} I don't have __KICK MEMBERS__ permission to execute this command`,
                    color: `${config.no}`
                }
            })
        }
        if (message.mentions.users.has(`${config.clientID}`)) {
            return message.channel.send({
                embed: {
                    title: `${config.red} Sorry but i dont have the courage to kick myself`,
                    color: `${config.no}`
                }
            })
        }

        if (member && member.user.id == message.author.id) return message.channel.send({
            embed: {
                title: `${config.red} You cannot kick yourself from __${message.guild.name}__`,
                color: `${config.no}`
            }
        })

        if (member && member.user.id === message.guild.ownerID) return message.channel.send({
            embed: {
                title: `${config.red} You cannot kick the server owner`,
                color: `${config.no}`
            }
        })

        if (member && member.roles.highest.position > message.guild.me.roles.highest.position || member && member.roles.highest.position == message.guild.me.roles.highest.position) return message.channel.send({
            embed: {
                title: ` ${config.red} I cannot ban the mentioned user because my role is lower or same in hierarchy as the mentioned user `,
                color: `${config.no}`
            }
        })

        if (message.member.hasPermission('KICK_MEMBERS')) {

            if (member) {
                message.channel.send({
                    embed: {
                        title: ` ${config.green} ${member.user.tag} is successfully kicked from __${message.guild.name}__`,
                        color: `${config.no}`,
                    }
                })
                member.kick()

            } else {
                return message.channel.send({
                    embed: {
                        title: `${config.red} Please mention a valid user you desire to kick from __${message.guild.name}__`,
                        color: `${config.no}`
                    }
                }) // no need to do error handing cuz its already done in index.js 
            }

        }




    }
}
