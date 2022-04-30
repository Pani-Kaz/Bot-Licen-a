const { MessageEmbed, DiscordAPIError } = require('discord.js');
const lb = require("quick.db")
exports.run = async (client, message, args, color) => {
    const logsativas = client.channels.cache.get(client.logsativas)

const option = args[0]
const licenca = args[1]
const user = message.mentions.users.first() || client.users.cache.get(args[2])

if(option == "criar") {
    if(!licenca)    return message.reply({content: `❎ | Você deve colocar a key que será ativa! Ex: -gerenciar <criar/editar/ver/apagar> <licença> <user> `})
    if(!user)    return message.reply({content: `❎ | Você deve colocar o user que a key será ativa! Ex: -gerenciar <criar/editar/ver/apagar> <licença> <user> `})

    lb.set(`${licenca}`, user.id)

    message.reply({content: `✅ | Licensa ativa! User: ${user} ( \`${user.id}\` )\n\n 📌 | Key: ||${licenca}|| `})

    logsativas.send({content: `🎉 | Licensa ativa!\n User: ${user} ( \`${user.id}\` )\n\n 📌 | Key: ||${licenca}|| `})





} else if(option == "editar") {
    if(!licenca)    return message.reply({content: `❎ | Você deve colocar a key que será editada! Ex: -gerenciar <criar/editar/ver/apagar> <licença> <user> `})
if(!user)    return message.reply({content: `❎ | Você deve colocar o user que a key será editada! Ex: -gerenciar <criar/editar/ver/apagar> <licença> <user> `})
    lb.set(`${licenca}`, user.id)

    message.reply({content: `✅ | Licensa Alterada! User: ${user} ( \`${user.id}\` )\n\n 📌 | Key: ||${licenca}|| `})

   

    
} else if(option == "ver") {

    if(!licenca)    return message.reply({content: `❎ | Você deve colocar a key que será procurada informações! Ex: -gerenciar <criar/editar/ver/apagar> <licença> `})
const ll = lb.get(`${licenca}`)
if(!ll)return message.reply({content: `❎ | Essa key não existe!`})
let embed = new MessageEmbed()
.setTitle("Achei algumas infos sobre...")
.addField("User", `<@${ll}> ( \`${ll}\` )`)
.setColor("RED")
message.reply({embeds: [embed]})
    
} else if(option == "apagar") {
    if(!licenca)    return message.reply({content: `❎ | Você deve colocar a key que será apagada! Ex: -gerenciar <criar/editar/ver/apagar> <licença> `})
    const ll = lb.get(`${licenca}`)
    if(!ll)return message.reply({content: `❎ | Essa key não existe!`})
    lb.delete(`${licenca}`)
    message.reply({content: `✅ | Licensa Deletada!`})

    
} else if(args[0] == null) {
    message.reply({content: `❎ | Você deve colocar o que deseja gerenciar! Ex: -gerenciar <criar/editar/ver/apagar> <licença> [user] `})
}


}
exports.conf = {
    aliases: ['gerenciar', 'gerenciar'],
    cooldown: "5"
}

exports.help = {
    name: 'gerenciar',
    description: 'Criar/editar/ver/apagar licenças ',
    usage: 'gerenciar <criar/editar/ver/apagar> <licença> [user]'
}