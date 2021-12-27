const green = '<:tick:818403293977378846>'
const red = '<:wrong:818403353808732192>'

module.exports = {
    name: 'ban',
    description: 'A ban command for moderators',
    async execute(message, args, client, bot) {

        const member = message.mentions.members.first()

        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send({
            embed: {
                title: `${red} You don't have __BAN MEMBERS__ permission to use this command`,
                color: 'RED'
            }
        })

        if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
            return message.channel.send({
                embed: {
                    title: `${red} I don't have __BAN MEMBERS__ permission to execute this command`,
                    color: 'RED'
                }
            })
        }

        if (member.user.id === message.author.id) return message.channel.send({
            embed: {
                title: `${red} You cannot ban yourself from the server`,
                color: 'RED'
            }
        })

        if (message.mentions.users.has('919342338902482944')) {
            return message.channel.send({
                embed: {
                    title: `${red} Sorry but i don't have the courage to ban myself`,
                    color: 'RED'
                }
            })
        }

        if (member && member.user.id === message.guild.ownerID) return message.channel.send({
            embed: {
                title: `${red} You cannot ban the server owner`,
                color: 'RED'
            }
        })


        if (member && member.roles.highest.position > message.guild.me.roles.highest.position || member && member.roles.highest.position == message.guild.me.roles.highest.position) return message.channel.send({
            embed: {
                title: ` ${red} I cannot ban the mentioned user because my role is lower or same in hierarchy as the mentioned user`,
                color: 'RED'
            }
        })

        if (message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('BAN_MEMBERS')) {

            const banReason = args.join(" ").slice(22)

            if (member == `<@${message.author.id}`) {
                return message.channel.send({
                    embed: {
                        title: `${red} You cannot ban your self`
                    }
                })
            }

            if (member) {
                message.channel.send({
                    embed: {
                        title: ` ${green} ${member.user.tag} is successfully been banned`,
                        color: message.guild.me.displayColor,
                    }
                })
                member.ban({
                    reason: banReason
                })
            } else {
                message.channel.send({
                        embed: {
                            title: `${red} Please mention a valid user you desire to ban from the server`,
                            color: 'RED'
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


    }

}