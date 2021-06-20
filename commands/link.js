const config = require("../config.json")
const Discord = require("discord.js")
const disbut = require('discord-buttons');

exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setTitle('LINK!')
    .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
    .setColor(config.color)
    .setDescription(`Github ➔ [Click Here](https://github.com/)\nTop.gg ➔ [Click Here](https://top.gg/)\nDiscord ➔ [Click Here](https://discord.com/)\nYoutube ➔ [Click Here](https://youtube.com/)\nKite ➔ [Click Here](https://kite.com/)`)
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp();

    message.channel.send(embed);
}
