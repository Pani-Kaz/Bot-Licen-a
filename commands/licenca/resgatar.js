const { MessageEmbed, DiscordAPIError } = require('discord.js');
const lb = require("quick.db")
exports.run = async (client, message, args, color) => {
    const logsresgatadas = client.channels.cache.get(client.logsresgatadas)


const licenca = args[0]

if(!licenca)    return message.reply({content: `❎ | Você deve colocar a key que será resgatada! Ex: -usar <licença>`})
const ll = lb.get(`${licenca}`)
if(!ll)    return message.reply({content: `❎ | Licença invalida!`})
const user = client.users.cache.get(ll)
if(!user.id == message.author.id) return  message.reply({content: `❎ | Licença invalida!`})

lb.delete(`${licenca}`)

message.reply({content: `❎ | Licença ativa!`})

logsresgatadas.send({content: `🎉 | Licensa Restada!\n User: ${user} ( \`${user.id}\` )\n\n 📌 | Key: ||${licenca}|| `})





}
exports.conf = {
    aliases: ['resgatar', 'resgatar'],
    cooldown: "5"
}

exports.help = {
    name: 'resgatar',
    description: 'Resgatar uma licença',
    usage: 'resgatar <licença> '
}