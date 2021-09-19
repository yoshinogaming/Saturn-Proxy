const config = require("../config.json")
const Discord = require("discord.js")
const disbut = require('discord-buttons');

exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setTitle('LINK!')
    .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
    .setColor(config.color)
    .setDescription(`ZhyTopia.xyz ➔ [click Here](https://zhytopia.xyz/)\nZhyTopia Github ➔ [click Here](https://github.com/ZhyTopia-Inc/)\nTop.gg ➔ [click Here](https://top.gg/)\nDiscord ➔ [click Here](https://discord.com/)\nYoutube ➔ [click Here](https://youtube.com/)\nKite ➔ [click Here](https://kite.com/)`)
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp();

    message.channel.send(embed);
}
