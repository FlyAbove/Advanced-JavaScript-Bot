module.exports = {
    name: 'about',
    description: 'A developers info command',
    async execute(message, args, client){
        const error = (err) => message.channel.send({embed: {
            color: "RED",
            description:  `[!} ${err}`
        }})
        
        message.channel.send({embed:{
            color: "" ,
            title: `Information about ${client.user.tag}`,
            description: 'Node Version\n``16.13.1``\n\nLibrary\n``discord.js v12.5.3``\n\nDeveloper\n``FlyAbove``\n\nCode Editor\n``Visual Studio Code``\n\nVersion\n``1.0.0``',
            footer: {
                text: `Requested by ${message.author.tag}`,
                timestamp: "new Date()" 
            }
        }})
       
        
    
}
}



