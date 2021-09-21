const config = require("../config.json");
const Discord = require("discord.js");
const emojis = require("../emoji.json");

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`${emojis.no} | You need **Manage_Guild** permission to run this command!`);

    let channel = client.channels.cache.get(message.channel.id)
    var posisi = channel.position;
 
    const embed = new Discord.MessageEmbed()
    .addField(`${emojis.yes} Nuked`, `Channel has been nuked.`)
    .setColor(config.color)
    .setTimestamp()

    channel.clone().then((channel2) => {
      channel2.setPosition(posisi)
      channel.delete()
      channel2.send(embed);
    })
}