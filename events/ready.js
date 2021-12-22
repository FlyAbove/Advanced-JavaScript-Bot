const fs = require('fs')
const {client, intents} = require('discord.js')
const config = require('./config.json')


const client = new Client({
    Intents : 32767
})

const eventFile = fs.readdirSync('./events').filter(file => endsWith('.js'))
for( const file of eventFiles)  {
    const event = require(`./events${file}`)
    if(event.once){
        client.once(event.name, (...args) => event.execute(...args) )
    } else{
        client.once(event.name, (...args) => event.execute(...args))
    }
}
client.login(config.token)