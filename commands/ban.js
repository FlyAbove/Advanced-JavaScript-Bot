const config = require('../config.json')

module.exports = {
    name: 'ban',
    description: 'A ban command for moderators',
    async execute(message, args, client, bot) {

        const member = message.mentions.members.first()

        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send({
            embed: {
                title: `${config.red} You don't have __BAN MEMBERS__ permission to execute this command`,
                color: `${config.no}`
            }
        })

        if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
            return message.channel.send({
                embed: {
                    title: `${config.red} I don't have __BAN MEMBERS__ permission to execute this command`,
                    color: `${config.no}`
                }
            })
        }

        if (member && member.user.id === message.author.id) return message.channel.send({
            embed: {
                title: `${config.red} You cannot ban yourself from __${message.guild.name}__`,
                color: `${config.no}`
            }
        })

        if (message.mentions.users.has('919342338902482944')) {
            return message.channel.send({
                embed: {
                    title: `${config.red} Sorry but i don't have the courage to ban myself`,
                    color: `${config.no}`
                }
            })
        }

        if (member && member.user.id === message.guild.ownerID) return message.channel.send({
            embed: {
                title: `${config.red} You cannot ban a server owner`,
                color: `${config.no}`
            }
        })


        if (member && member.roles.highest.position > message.guild.me.roles.highest.position || member && member.roles.highest.position == message.guild.me.roles.highest.position) return message.channel.send({
            embed: {
                title: `${config.red} I cannot ban the mentioned user because my role is lower or same in hierarchy as the mentioned user`,
                color: `${config.no}`
            }
        })

        
        if (message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('BAN_MEMBERS')) {

            const banReason = args.join(" ").slice(22)

            if (member) {
                message.channel.send({
                    embed: {
                        title: ` ${config.green} ${member.user.tag} is successfully banned from __${message.guild.name}__`,
                        color: `${config.ok}`
                    }
                })
                member.ban({
                    reason: `${banReason} by ${message.author.tag}`
                })
            } else {
                message.channel.send({
                        embed: {
                            title: `${config.red} Please mention a valid user you desire to ban from __${message.guild.name}__`,
                            color: `${config.no}`
                        }
                    })

                    .catch(error => {
                        console.error(error)
                        return message.channel.send({
                            embed: {
                                title: `${config.red} There was an error while executing this command: ${error}`,
                                color: `${config.no}`
                            }
                        })

                    })
            }


        }


    }

}