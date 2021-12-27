const Discord = require("discord.js") // This just imports the discord.js library
const client = new Discord.Client(); // This just imports the Discord.Client class which is then turned into an object
const config = require("./config.json") // To create a connection to config.json file
const prefix = config.prefix // This imports prefix from config.json
/* The code below is actually to create a connection to commands folder so the code could read, write
and access to only JavaScript files such as (ping.js, ban.js)
*/
const fs = require('fs'); // This line allows the index.js to access other files
const {
    type
} = require("os");
client.commands = new Discord.Collection() // A command collection
const commandFile = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
// To filter only JavaScript files from commands folder 

/* The code below is only command handler */
for (const file of commandFile) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
    console.log(`[>] Command loaded ${command.name}`)
}

client.on('ready', () => {
    client.user.setActivity(config.Activity)
    console.log(`[>] ${client.user.tag} is ready to serve`)
    if (!config.Activity) return console.log('[!] The bot activity status is empty')
    console.log(`[>] ${config.Activity} is the bot's activity status`) // Bot ready message event

});

client.on('message', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!client.commands.get(command)) return;
    try {
        client.commands.get(command).execute(message, args, client);
    } catch (err) {
        message.channel.send({
            embed: {
                color: RED,
                description: "There was an error trying to execute that command",
            }
        })
    }

});
client.login(config.token) /* Add the token of your bot in config.json file*/

    .catch(error => {
        console.log(`[!] Error logged in ${error}`) // It's good to for error handling 
    })