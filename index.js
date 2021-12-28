const Discord = require("discord.js") // This just imports the discord.js library
const client = new Discord.Client(); // This just imports the Discord.Client class which is then turned into an object
const config = require("./config.json") // To create a connection to config.json file
const prefix = config.prefix // This just imports prefix from config.json
/* The code below is actually to create a connection to commands folder so the code could read, write
and access to only JavaScript files such as (ping.js, ban.js)
*/
const fs = require('fs'); // This line allows the index.js to access other files
const {
    type
} = require("os");
client.commands = new Discord.Collection() // A command collection
client.aliases = new Discord.Collection()
client.cooldown = new Discord.Collection()

const commandFile = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
// To filter only JavaScript files from commands folder

/* The code below is only command handler */
for (const file of commandFile) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
    console.log(`[>] Command loaded ${command.name}`)
    client.aliases.set(command.aliases, command)
    console.log(`[>] Loaded aliase ${command.alisases.map((alias) => alias + "\n")}`); // load the aliases (should work (hopefully))
}

client.on('ready', () => {
    client.user.setActivity(config.Activity, {
        type: `${config.Type}`
    })
    console.log(`[>] ${client.user.tag} is ready to serve`)
    if (!config.Activity) return console.log('[!] The bot activity status is empty')
    console.log(`[>] ${config.Activity} is the bot's activity status`) // Bot ready message event
}); // this is the bot ready event, this event will be emited once discord.js has established a websocket connection with discord thru your token, this event will not be emited if your token is wrong or there was any error in client.login method

client.on('message', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (command) {
        try {
            command.execute(message, args, client)
        } catch (e) {
            message.channel.send({
                embed: {
                    color: "RED",
                    description: `There was an error executing the command ${commandName}`
                }
            })
        }
    }
})
client.login(config.token) /* Add the token of your bot in config.json file*/

    .catch(error => {
        console.log(`[!] Error logged in ${error}`) // It's good to do error handling
    })
